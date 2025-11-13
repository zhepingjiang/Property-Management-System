package com.laioffer.pmsbackend.repository;

import com.laioffer.pmsbackend.model.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscussionRepository extends JpaRepository<PostEntity,Long> {
    List<PostEntity> id(Long id);

    //    findById(Long id)	    根据ID查找	    repository.findById(123L)
    //    existsById(Long id)	检查ID是否存在	repository.existsById(123L)
    //    findAll()	            查找所有记录	    repository.findAll()
    //    save(Entity entity)	保存记录	        repository.save(announcement)
    //    deleteById(Long id)	根据ID删除	    repository.deleteById(123L)
    //    count()	            统计记录数	    repository.count()

}
