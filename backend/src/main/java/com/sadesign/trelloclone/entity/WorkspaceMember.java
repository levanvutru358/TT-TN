package com.sadesign.trelloclone.entity;

import com.sadesign.trelloclone.entity.base.AuditableEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "workspace_member")
public class WorkspaceMember extends AuditableEntity {
}


