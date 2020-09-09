package com.bitebao.entity.base;

import lombok.Data;

import javax.persistence.*;

@Data
@MappedSuperclass
public class BaseEntity {
    @Id
    @Column(name = "ID", columnDefinition = "bigint(20) comment'流水號'")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

}

