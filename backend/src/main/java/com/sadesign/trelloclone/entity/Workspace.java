package com.sadesign.trelloclone.entity;

import com.sadesign.trelloclone.entity.base.AuditableEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "workspace")
public class Workspace extends AuditableEntity {
}


