package com.laioffer.pmsbackend.repository;
import com.laioffer.pmsbackend.model.PostEntity;
import com.laioffer.pmsbackend.model.enums.PostStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<PostEntity,Long> {

    //    findById(Long id)	    根据ID查找	    repository.findById(123L)
    //    existsById(Long id)	检查ID是否存在	repository.existsById(123L)
    //    findAll()	            查找所有记录	    repository.findAll()
    //    save(Entity entity)	保存记录	        repository.save(announcement)
    //    deleteById(Long id)	根据ID删除	    repository.deleteById(123L)
    //    count()	            统计记录数	    repository.count()

    List<PostEntity> findAllByOrderByCreatedAtDesc();

    Optional<PostEntity> findFirstByOrderByCreatedAtDesc();

    List<PostEntity> findAllByAuthorIdOrderByCreatedAtDesc(Long authorId);

    @Modifying
    @Query("UPDATE PostEntity p SET p.status = :status WHERE p.id = :id")
    void updateStatus(@Param("id") Long id, @Param("status") PostStatus status);
}
