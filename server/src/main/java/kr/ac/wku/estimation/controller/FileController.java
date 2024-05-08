package kr.ac.wku.estimation.controller;

import kr.ac.wku.estimation.entity.HFile;
import kr.ac.wku.estimation.service.FileService;
import kr.ac.wku.estimation.socket.ClientSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping("upload")
    public ResponseEntity<String> uploadFile(String name, String owner, MultipartFile file) throws IOException {
        fileService.uploadFile(UUID.fromString(owner), name, file);
        ClientSocketHandler.sendMessageToAI("uploaded:"+name);
        return ResponseEntity.ok("uploaded:"+name);
    }

    @GetMapping("image/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable final String fileId) {
        System.out.println(fileId);
        Optional<HFile> file = fileService.findByName(fileId);
        if(file.isEmpty()) return ResponseEntity.notFound().build();
        HFile hFile = file.get();
        Resource resource = fileService.readFileAsResource(hFile);
        try {
            String filename = URLEncoder.encode(hFile.getFileName()+hFile.getExtension(), "UTF-8");
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; fileName=\"" + filename + "\";")
                    .header(HttpHeaders.CONTENT_LENGTH, hFile.getSize()+"")
                    .body(resource);

        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("filename encoding failed : " + hFile.getFileName());
        }
    }

}
