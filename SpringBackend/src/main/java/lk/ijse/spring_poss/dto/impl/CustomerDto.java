package lk.ijse.spring_poss.dto.impl;

import lk.ijse.spring_poss.dto.CustomerStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomerDto implements CustomerStatus {
    private String id;
    private String name;
    private String address;
    private String number;
}
