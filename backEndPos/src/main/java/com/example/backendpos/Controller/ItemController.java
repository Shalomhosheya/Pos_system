package com.example.backendpos.Controller;

import com.example.backendpos.Dto.CustomerDto;
import com.example.backendpos.Dto.ItemDto;
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

@WebServlet(name = "hello",value = "/item")
public class ItemController extends HttpServlet {
Connection connection;
static  String POST_DATA="INSERT INTO Item VALUES(?,?,?,?,?)";
static  String UPATE_DATA="update Item set type=?, title=?, quantity=? ,amount=? where id=? ";
static  String DELETE_DATA="DELETE FROM Item where id=? ";

    @Override
    protected void doPatch(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("doPatch");
        if (!req.getContentType().toLowerCase().endsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_UNSUPPORTED_MEDIA_TYPE);
        }

        Jsonb jsonb = JsonbBuilder.create();
        ItemDto itemDto = jsonb.fromJson(req.getReader(), ItemDto.class);

        try {

            PreparedStatement psm = connection.prepareStatement(UPATE_DATA);

            psm.setString(1, itemDto.getType());
            psm.setString(2, itemDto.getTitle());
            psm.setString(3, itemDto.getQuantity());
            psm.setString(4, itemDto.getAmount());
            psm.setString(5, itemDto.getId());

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
        if (!req.getContentType().toLowerCase().endsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_UNSUPPORTED_MEDIA_TYPE);
        }
        Jsonb jsonb = JsonbBuilder.create();
        ItemDto itemDto = jsonb.fromJson(req.getReader(), ItemDto.class);

            try {
                PreparedStatement pstm = connection.prepareStatement(POST_DATA);
                pstm.setString(1,itemDto.getId());
                pstm.setString(2,itemDto.getType());
                pstm.setString(3,itemDto.getTitle());
                pstm.setString(4,itemDto.getQuantity());
                pstm.setString(5,itemDto.getAmount());

                if (pstm.executeUpdate() != 0) {
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
            var ps = connection.prepareStatement(DELETE_DATA);
            Jsonb jsonb = JsonbBuilder.create();
            ItemDto itemDto = jsonb.fromJson(req.getReader(), ItemDto.class);
            System.out.println(itemDto.getId());

            ps.setString(1, itemDto.getId());
            if (ps.executeUpdate() != 0) {
                System.out.println("deleted");
            } else {
                System.out.println("not deleted");
            }
        }catch (SQLException e){
            throw new RuntimeException();
        }
    }

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
}
