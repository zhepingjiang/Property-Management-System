package com.laioffer.pmsbackend.repository;

import com.laioffer.pmsbackend.model.NewsletterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NewsletterRepository extends JpaRepository<NewsletterEntity, Long> {

    List<NewsletterEntity> findAllByOrderByCreatedAtDesc();

    Optional<NewsletterEntity> findFirstByOrderByCreatedAtDesc();
}
