package com.example.backendpos.Controller;

import com.example.backendpos.Dto.CustomerDto;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
@WebServlet(name = "helloServlet", value = "/customer")
public class CustomerController extends HttpServlet {
    Connection connection;
    static String saveCus = "insert into Customer values(?,?,?,?)";
    static String getData = "select * from Customer ";
    static String updateData = "update Customer set name=?, address=?, number=? where id=? ";
    static String deletedata = "DELETE FROM Customer WHERE id=?";

    @Override
    public void init() throws ServletException {

        try {

            InitialContext ctx = new InitialContext();
            DataSource dataSource = (DataSource) ctx.lookup("java:comp/env/jdbc/PosSystemDataBase");

            this.connection = dataSource.getConnection();


        } catch (NamingException | SQLException e) {

            throw new RuntimeException(e);
}

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Create a CustomerDto instance
        var customerDto = new CustomerDto();

        try {
            // Prepare the SQL statement
            var ps = connection.prepareStatement(getData);

            // Execute the query
            var resultSet = ps.executeQuery();

            // Process the result set
            while (resultSet.next()) {
                customerDto.setId(resultSet.getString("id"));
                customerDto.setName(resultSet.getString("name"));
                customerDto.setAddress(resultSet.getString("address"));
                customerDto.setNumber(resultSet.getString("number"));

                // Print customer details to the console
                System.out.println("Customer ID: " + customerDto.getId());
                System.out.println("Customer Name: " + customerDto.getName());
                System.out.println("Customer Address: " + customerDto.getAddress());
                System.out.println("Customer Number: " + customerDto.getNumber());
                System.out.println("-----------");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPatch(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("doPatch");
        if (!req.getContentType().toLowerCase().endsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_UNSUPPORTED_MEDIA_TYPE);
        }

        Jsonb jsonb = JsonbBuilder.create();
        CustomerDto customerDto = jsonb.fromJson(req.getReader(), CustomerDto.class);

        try {

            PreparedStatement psm = connection.prepareStatement(updateData);

            psm.setString(1, customerDto.getName());
            psm.setString(2, customerDto.getAddress());
            psm.setString(3, customerDto.getNumber());
            psm.setString(4, customerDto.getId());
            if (psm.executeUpdate() != 0) {
                System.out.println("updated");
            } else {
                System.out.println("not updated");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("do");
        if (!req.getContentType().toLowerCase().endsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_UNSUPPORTED_MEDIA_TYPE);
        }

        Jsonb jsonb = JsonbBuilder.create();
        CustomerDto customerDto = jsonb.fromJson(req.getReader(), CustomerDto.class);

        try {

            PreparedStatement psm = connection.prepareStatement(saveCus);
            psm.setString(1, customerDto.getId());
            psm.setString(2, customerDto.getName());
            psm.setString(3, customerDto.getAddress());
            psm.setString(4, customerDto.getNumber());

            if (psm.executeUpdate() != 0) {
                System.out.println("saved");
            } else {
                System.out.println("not saved");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("doDLETE");
        try {
            var ps = connection.prepareStatement(deletedata);
            Jsonb jsonb = JsonbBuilder.create();
            CustomerDto customerDto = jsonb.fromJson(req.getReader(), CustomerDto.class);

            ps.setString(1, customerDto.getId());
            if (ps.executeUpdate() != 0) {
                System.out.println("deleted");
            } else {
                System.out.println("not deleted");
            }
        }catch (SQLException e){
            throw new RuntimeException();
        }

    }
}
