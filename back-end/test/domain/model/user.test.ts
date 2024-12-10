import { User } from "../../../model/user";
import bcrypt from "bcryptjs";


test("given: valid values, when: creating user, then: user is created with those values", async () => {
    // Given / When
    const valid_user = await User.createUser({
        id: 1,
        email: "johndoe@gmail.com",
        password: "password123",
        name: "John Doe",
        age: 25,
    });

    // Then
    expect(valid_user.getId()).toEqual(1);
    expect(valid_user.getEmail()).toEqual("johndoe@gmail.com");
    expect(valid_user.getName()).toEqual("John Doe");
    expect(valid_user.getAge()).toEqual(25);

    // Check password is hashed
    const isPasswordHashed = await bcrypt.compare("password123", valid_user.getPassword());
    expect(isPasswordHashed).toBe(true);
});

test("given: valid user, when: updating properties, then: properties are updated", async () => {
    // Given
    const valid_user = await User.createUser({
        id: 1,
        email: "johndoe@gmail.com",
        password: "password123",
        name: "John Doe",
        age: 25,
    });

    // When
    valid_user.setName("Jane Doe");
    valid_user.setEmail("janedoe@gmail.com");
    await valid_user.setPassword("newpassword123");
    valid_user.setAge(30);

    // Then
    expect(valid_user.getName()).toEqual("Jane Doe");
    expect(valid_user.getEmail()).toEqual("janedoe@gmail.com");
    expect(valid_user.getAge()).toEqual(30);

    // Check updated password is hashed
    const isPasswordUpdatedHashed = await bcrypt.compare("newpassword123", valid_user.getPassword());
    expect(isPasswordUpdatedHashed).toBe(true);
});

test("given: valid user, when: converting to JSON, then: sensitive data is excluded", async () => {
    // Given
    const valid_user = await User.createUser({
        id: 1,
        email: "johndoe@gmail.com",
        password: "password123",
        name: "John Doe",
        age: 25,
    });

    // When
    const userJSON = valid_user.toJSON();

    // Then
    expect(userJSON).toEqual({
        id: 1,
        email: "johndoe@gmail.com",
        name: "John Doe",
        age: 25,
    });

    // Ensure password is not included in the JSON
    expect(userJSON).not.toHaveProperty("password");
});
