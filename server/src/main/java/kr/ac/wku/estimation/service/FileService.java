package kr.ac.wku.estimation.service;

import kr.ac.wku.estimation.entity.HFile;
import kr.ac.wku.estimation.properties.StorageProperties;
import kr.ac.wku.estimation.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
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
                .extension(fileExtension)
                .size(file.getSize())
                .build());
    }

    public Resource readFileAsResource(final HFile file) {
        Path destinationFile = Paths.get(storageProperties.getPath()).resolve(
                        Paths.get(file.getFileName()+file.getExtension()))
                .normalize().toAbsolutePath();
        try {
            Resource resource = new UrlResource(destinationFile.toUri());
            if (resource.exists() == false || resource.isFile() == false) {
                throw new RuntimeException("file not found : " + destinationFile.toString());
            }
            return resource;
        } catch (MalformedURLException e) {
            throw new RuntimeException("file not found : " + destinationFile.toString());
        }
    }

    public Optional<HFile> findByName(String name){
        return fileRepository.findByFileName(name);
    }

    public List<HFile> findByOwner(UUID owner){
        return fileRepository.findAllByOwner(owner.toString());
    }

    public void save(HFile file){
        fileRepository.save(file);
    }

    public void delete(HFile file){
        fileRepository.delete(file);
    }
}
