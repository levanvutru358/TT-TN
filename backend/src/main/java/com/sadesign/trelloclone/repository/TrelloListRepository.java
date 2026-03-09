package com.sadesign.trelloclone.repository;

import com.sadesign.trelloclone.entity.TrelloList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrelloListRepository extends JpaRepository<TrelloList, Long> {
}
