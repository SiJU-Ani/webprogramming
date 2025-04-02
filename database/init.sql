-- Create the database if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'FoodiGoodi')
BEGIN
    CREATE DATABASE FoodiGoodi;
END
GO

USE FoodiGoodi;
GO

-- Create Users table if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
BEGIN
    CREATE TABLE Users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(50) NOT NULL UNIQUE,
        email NVARCHAR(100) NOT NULL UNIQUE,
        password NVARCHAR(255) NOT NULL,
        role NVARCHAR(20) DEFAULT 'user',
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE()
    );
END
GO

-- Create stored procedure for user registration
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_RegisterUser')
    DROP PROCEDURE sp_RegisterUser
GO

CREATE PROCEDURE sp_RegisterUser
    @username NVARCHAR(50),
    @email NVARCHAR(100),
    @password NVARCHAR(255)
AS
BEGIN
    INSERT INTO Users (username, email, password)
    VALUES (@username, @email, @password);
    
    SELECT id, username, email, role
    FROM Users
    WHERE id = SCOPE_IDENTITY();
END
GO

-- Create stored procedure for user login
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_GetUserByEmail')
    DROP PROCEDURE sp_GetUserByEmail
GO

CREATE PROCEDURE sp_GetUserByEmail
    @email NVARCHAR(100)
AS
BEGIN
    SELECT id, username, email, password, role
    FROM Users
    WHERE email = @email;
END
GO 