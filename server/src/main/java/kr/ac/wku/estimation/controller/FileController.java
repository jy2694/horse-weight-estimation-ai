package kr.ac.wku.estimation.controller;

import kr.ac.wku.estimation.service.FileService;
import kr.ac.wku.estimation.socket.ClientSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

}
