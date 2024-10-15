package lk.ijse.spring_poss.util;

import lk.ijse.spring_poss.dto.impl.CustomerDto;
import lk.ijse.spring_poss.entity.impl.CustomerEntity;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Mapping {
    @Autowired
    private ModelMapper modelMapper;

    public CustomerDto tocustomerDto(CustomerEntity customerEntity){
       return modelMapper.map(customerEntity, CustomerDto.class);
    }

    public CustomerEntity tocustomerEntity(CustomerDto customerDto){
       return modelMapper.map(customerDto, CustomerEntity.class);
    }
    public List<CustomerDto> asCustomerDtoList(List<CustomerEntity>customerDto){
       return modelMapper.map(customerDto,new TypeToken<List<CustomerDto>>(){}.getType());
    }

}
