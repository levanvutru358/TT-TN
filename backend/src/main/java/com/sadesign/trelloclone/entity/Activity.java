package com.sadesign.trelloclone.entity;

import com.sadesign.trelloclone.entity.base.AuditableEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "activity")
public class Activity extends AuditableEntity {
}


