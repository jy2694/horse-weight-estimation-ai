package kr.ac.wku.estimation.repository;

import kr.ac.wku.estimation.entity.HFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<HFile, Long> {
    List<HFile> findAllByOwner(String owner);
    Optional<HFile> findByFileName(String fileName);
}
