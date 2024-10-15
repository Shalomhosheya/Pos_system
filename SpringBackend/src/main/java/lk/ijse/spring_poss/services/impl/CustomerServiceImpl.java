package lk.ijse.spring_poss.services.impl;

import jakarta.transaction.Transactional;
import lk.ijse.spring_poss.dao.CustomerDao;
import lk.ijse.spring_poss.dto.impl.CustomerDto;
import lk.ijse.spring_poss.entity.impl.CustomerEntity;
import lk.ijse.spring_poss.exception.DataPersistException;
import lk.ijse.spring_poss.services.CustomerService;
import lk.ijse.spring_poss.util.Apputil;
import lk.ijse.spring_poss.util.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerDao customerDao;
    @Autowired
    private Mapping mapping;

    @Override
    public void saveCustomer(CustomerDto customerDto) {
        customerDto.setId(Apputil.generateCustomerID());
        CustomerEntity savedNote =
                customerDao.save(mapping.tocustomerEntity(customerDto));
        if(savedNote == null){
            throw new DataPersistException("Customer not saved");
        }
    }
}
