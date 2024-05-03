package kr.ac.wku.estimation.service;

import kr.ac.wku.estimation.entity.HFile;
import kr.ac.wku.estimation.properties.StorageProperties;
import kr.ac.wku.estimation.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;
    private final StorageProperties storageProperties;

    public void uploadFile(UUID owner, String name, MultipartFile file) throws IOException {
        String path = file.getOriginalFilename();
        String[] pathsplit = Objects.requireNonNull(path).split("/");
        String fileName = pathsplit[pathsplit.length-1];
        String fileExtension = Objects.requireNonNull(fileName).substring(fileName.lastIndexOf("."));
        Path destinationFile = Paths.get(storageProperties.getPath()).resolve(
                        Paths.get(name+fileExtension))
                .normalize().toAbsolutePath();
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, destinationFile,
                    StandardCopyOption.REPLACE_EXISTING);
        }

        fileRepository.save(HFile.builder()
                .fileName(name)
                .owner(owner.toString())
                .flag(false)
                .build());
    }

    public Optional<HFile> findByName(String name){
        return fileRepository.findByFileName(name);
    }

    public List<HFile> findByOwner(UUID owner){
        return fileRepository.findAllByOwner(owner.toString());
    }
}
