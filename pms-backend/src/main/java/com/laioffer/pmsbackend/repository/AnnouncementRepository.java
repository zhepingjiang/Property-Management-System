package com.laioffer.pmsbackend.repository;

import com.laioffer.pmsbackend.model.AnnouncementEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnnouncementRepository extends JpaRepository<AnnouncementEntity, Long> {

//    findById(Long id)	    根据ID查找	    repository.findById(123L)
//    existsById(Long id)	检查ID是否存在	repository.existsById(123L)
//    findAll()	            查找所有记录	    repository.findAll()
//    save(Entity entity)	保存记录	        repository.save(announcement)
//    deleteById(Long id)	根据ID删除	    repository.deleteById(123L)
//    count()	            统计记录数	    repository.count()

    List<AnnouncementEntity> findAllByOrderByCreatedAtDesc();

    Optional<AnnouncementEntity> findFirstByOrderByCreatedAtDesc();
}