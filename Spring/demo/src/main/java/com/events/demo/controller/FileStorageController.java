package com.events.demo.controller;

import com.events.demo.fileStorage.FileStorageProperties;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
@RequestMapping("/api/files")
public class FileStorageController {
    private final Path fileStorageLocation;

    public FileStorageController(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();
    }

    @PostMapping("/upload/{id}")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable String id) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Criar a subpasta com base no id
            Path folderLocation = fileStorageLocation.resolve(id);
            Files.createDirectories(folderLocation);

            // Salvar o arquivo na subpasta
            Path targetLocation = folderLocation.resolve(fileName);
            file.transferTo(targetLocation);

            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("api/files/download/")
                    .path(id)
                    .toUriString();

            return ResponseEntity.ok(fileDownloadUri);
        } catch (IOException ex) {
            System.err.println(ex);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String id, HttpServletRequest request) throws IOException {
        // Localizar a subpasta pelo id
        Path folderPath = fileStorageLocation.resolve(id).normalize();

        if (!Files.exists(folderPath) || !Files.isDirectory(folderPath)) {
            folderPath = fileStorageLocation.resolve("notfound").normalize();
            DirectoryStream<Path> stream = Files.newDirectoryStream(folderPath);
            for (Path filePath : stream) {
                if (Files.isRegularFile(filePath)) {
                    Resource resource = new UrlResource(filePath.toUri());
                    String contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());

                    if (contentType == null) {
                        contentType = "application/octet-stream";
                    }

                    return ResponseEntity.ok()
                            .contentType(MediaType.parseMediaType(contentType))
                            .body(resource);
                }
            }
            //return ResponseEntity.notFound().build();
        }

        // Obter o arquivo na pasta (assumindo apenas um arquivo por pasta)
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(folderPath)) {
            for (Path filePath : stream) {
                if (Files.isRegularFile(filePath)) {
                    Resource resource = new UrlResource(filePath.toUri());
                    String contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());

                    if (contentType == null) {
                        contentType = "application/octet-stream";
                    }

                    return ResponseEntity.ok()
                            .contentType(MediaType.parseMediaType(contentType))
                            .body(resource);
                }
            }
        } catch (IOException e) {
            System.err.println(e);
        }

        return ResponseEntity.notFound().build();
    }

}
