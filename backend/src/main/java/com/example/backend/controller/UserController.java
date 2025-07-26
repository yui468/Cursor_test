package com.example.backend.controller;

import com.example.backend.dto.UserDto;
import com.example.backend.dto.CreateUserRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@Tag(name = "User Management", description = "User management APIs")
public class UserController {

    @GetMapping
    @Operation(
        summary = "Get all users",
        description = "Retrieve a list of all users"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved users",
            content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = UserDto.class))),
        @ApiResponse(responseCode = "404", description = "No users found")
    })
    public ResponseEntity<List<UserDto>> getAllUsers() {
        // TODO: Implement actual user retrieval logic
        return ResponseEntity.ok(List.of());
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Get user by ID",
        description = "Retrieve a specific user by their ID"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved user",
            content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = UserDto.class))),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    public ResponseEntity<UserDto> getUserById(
        @Parameter(description = "User ID", required = true, example = "1")
        @PathVariable Long id
    ) {
        // TODO: Implement actual user retrieval logic
        return ResponseEntity.ok(new UserDto(id, "John Doe", "john@example.com"));
    }

    @PostMapping
    @Operation(
        summary = "Create a new user",
        description = "Create a new user with the provided information"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "User created successfully",
            content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = UserDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public ResponseEntity<UserDto> createUser(
        @Parameter(description = "User information", required = true)
        @Valid @RequestBody CreateUserRequest request
    ) {
        // TODO: Implement actual user creation logic
        UserDto newUser = new UserDto(1L, request.getName(), request.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @PutMapping("/{id}")
    @Operation(
        summary = "Update user",
        description = "Update an existing user's information"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User updated successfully",
            content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = UserDto.class))),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public ResponseEntity<UserDto> updateUser(
        @Parameter(description = "User ID", required = true, example = "1")
        @PathVariable Long id,
        @Parameter(description = "Updated user information", required = true)
        @Valid @RequestBody CreateUserRequest request
    ) {
        // TODO: Implement actual user update logic
        UserDto updatedUser = new UserDto(id, request.getName(), request.getEmail());
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    @Operation(
        summary = "Delete user",
        description = "Delete a user by their ID"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "User deleted successfully"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    public ResponseEntity<Void> deleteUser(
        @Parameter(description = "User ID", required = true, example = "1")
        @PathVariable Long id
    ) {
        // TODO: Implement actual user deletion logic
        return ResponseEntity.noContent().build();
    }
}