package kr.ac.wku.estimation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompleteDTO {
    private String fileName;
    private Double tall;
    private Double weight;
    private String reason;
}
