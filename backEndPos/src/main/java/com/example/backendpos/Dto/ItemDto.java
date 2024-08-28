package com.example.backendpos.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
private String id;
private String type;
private String title;
private String quantity;
private String amount;
}
