const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface RegisterUserData {
  email: string;
  password: string;
  name: string;
  age: number;
}

const createUser = async (userData: RegisterUserData) => {
  const url = `${API_URL}/users`;
  console.log("Making request to:", url);
  console.log("With data:", userData);

  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      try {
        const jsonError = JSON.parse(errorData);
        throw new Error(jsonError.message || "Registration failed");
      } catch {
        throw new Error(`Registration failed: ${response.statusText}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getUserById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const updateUser = async (id: number, user: any) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const deleteUser = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

const UserService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default UserService;
