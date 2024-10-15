package lk.ijse.spring_poss.dao;

import lk.ijse.spring_poss.entity.impl.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CustomerDao extends JpaRepository<CustomerEntity,String> {

}
