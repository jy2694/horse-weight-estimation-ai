package kr.ac.wku.estimation.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class HFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String owner;
    @Column(nullable = false)
    private String fileName;
    @Column(nullable = false)
    private Boolean flag;
    private Double tall;
    private Double weight;
    private String reason;
}
