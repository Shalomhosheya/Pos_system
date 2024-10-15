package lk.ijse.spring_poss.entity.impl;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lk.ijse.spring_poss.entity.SuperEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CustomerEntity implements SuperEntity {
    @Id
    private String id;
    private String name;
    private String address;
    private String number;
}
