USE [master]
GO
/****** Object:  Database [testConflict]    Script Date: 12/19/2023 8:15:36 PM ******/
CREATE DATABASE [testConflict]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'testConflict', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\testConflict.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'testConflict_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\testConflict_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [testConflict] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [testConflict].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [testConflict] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [testConflict] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [testConflict] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [testConflict] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [testConflict] SET ARITHABORT OFF 
GO
ALTER DATABASE [testConflict] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [testConflict] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [testConflict] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [testConflict] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [testConflict] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [testConflict] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [testConflict] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [testConflict] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [testConflict] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [testConflict] SET  DISABLE_BROKER 
GO
ALTER DATABASE [testConflict] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [testConflict] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [testConflict] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [testConflict] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [testConflict] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [testConflict] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [testConflict] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [testConflict] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [testConflict] SET  MULTI_USER 
GO
ALTER DATABASE [testConflict] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [testConflict] SET DB_CHAINING OFF 
GO
ALTER DATABASE [testConflict] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [testConflict] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [testConflict] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [testConflict] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [testConflict] SET QUERY_STORE = ON
GO
ALTER DATABASE [testConflict] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [testConflict]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 12/19/2023 8:15:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[username] [varchar](255) NOT NULL,
	[password] [varchar](255) NULL,
	[accountType] [varchar](255) NOT NULL,
 CONSTRAINT [PK__Account__61899E053C32DC03] PRIMARY KEY CLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Admin]    Script Date: 12/19/2023 8:15:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admin](
	[adminUserName] [varchar](255) NOT NULL,
	[adminPassword] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[adminUserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Dentist]    Script Date: 12/19/2023 8:15:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dentist](
	[dentistFullName] [varchar](255) NOT NULL,
	[dentistUserName] [varchar](255) NOT NULL,
	[dentistPassword] [varchar](255) NOT NULL,
 CONSTRAINT [PK_Dentist_1] PRIMARY KEY CLUSTERED 
(
	[dentistUserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Drug]    Script Date: 12/19/2023 8:15:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Drug](
	[drugId] [int] IDENTITY(1,1) NOT NULL,
	[drugName] [varchar](255) NOT NULL,
	[indication] [varchar](255) NOT NULL,
	[expiredDate] [date] NOT NULL,
	[unit] [varchar](255) NOT NULL,
	[stockNumber] [int] NOT NULL,
	[price] [int] NOT NULL,
 CONSTRAINT [PK__Drug__A127A63DC615A133] PRIMARY KEY CLUSTERED 
(
	[drugId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Patient]    Script Date: 12/19/2023 8:15:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Patient](
	[patientFullName] [varchar](255) NOT NULL,
	[patientPhoneNumber] [varchar](255) NOT NULL,
	[patientPassword] [varchar](255) NULL,
	[patientDateOfBirth] [date] NOT NULL,
	[patientAddress] [varchar](255) NOT NULL,
 CONSTRAINT [PK__Patient__2D530CE4BC9C6759] PRIMARY KEY CLUSTERED 
(
	[patientPhoneNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[patientDrugs]    Script Date: 12/19/2023 8:15:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[patientDrugs](
	[medicalRecordId] [int] NOT NULL,
	[drugId] [int] NOT NULL,
	[quantity] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[patientMedicalRecords]    Script Date: 12/19/2023 8:15:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[patientMedicalRecords](
	[medicalRecordId] [int] IDENTITY(1,1) NOT NULL,
	[patientPhoneNumber] [varchar](255) NOT NULL,
	[examinationDate] [date] NOT NULL,
	[examinationTime] [time](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[medicalRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[patientServices]    Script Date: 12/19/2023 8:15:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[patientServices](
	[medicalRecordId] [int] NOT NULL,
	[serviceId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Receipt]    Script Date: 12/19/2023 8:15:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Receipt](
	[receiptId] [int] IDENTITY(1,1) NOT NULL,
	[medicalRecordId] [int] NULL,
	[totalPrice] [int] NULL,
	[paymentStatus] [varchar](255) NULL,
 CONSTRAINT [PK_Receipt] PRIMARY KEY CLUSTERED 
(
	[receiptId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[scheduleAppointment]    Script Date: 12/19/2023 8:15:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[scheduleAppointment](
	[appointmentId] [int] IDENTITY(1,1) NOT NULL,
	[patientPhoneNumber] [varchar](255) NOT NULL,
	[appointmentDate] [date] NOT NULL,
	[appointmentTime] [time](7) NOT NULL,
	[dentistUserName] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[appointmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Service]    Script Date: 12/19/2023 8:15:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Service](
	[serviceId] [int] IDENTITY(1,1) NOT NULL,
	[serviceName] [varchar](255) NOT NULL,
	[price] [int] NOT NULL,
 CONSTRAINT [PK__Service__455070DF79F49D38] PRIMARY KEY CLUSTERED 
(
	[serviceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Staff]    Script Date: 12/19/2023 8:15:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Staff](
	[staffFullName] [varchar](255) NOT NULL,
	[staffUserName] [varchar](255) NOT NULL,
	[staffPassword] [varchar](255) NOT NULL,
 CONSTRAINT [PK_Staff_1] PRIMARY KEY CLUSTERED 
(
	[staffUserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[workSchedule]    Script Date: 12/19/2023 8:15:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[workSchedule](
	[scheduleId] [int] IDENTITY(1,1) NOT NULL,
	[dentistUserName] [varchar](255) NOT NULL,
	[workingDate] [date] NOT NULL,
	[startTime] [time](7) NOT NULL,
	[endTime] [time](7) NOT NULL,
	[busyStatus] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[scheduleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Account] ([username], [password], [accountType]) VALUES (N'A', N'1', N'Admin')
INSERT [dbo].[Account] ([username], [password], [accountType]) VALUES (N'B', N'2', N'Admin')
INSERT [dbo].[Account] ([username], [password], [accountType]) VALUES (N'C', N'3', N'Admin')
INSERT [dbo].[Account] ([username], [password], [accountType]) VALUES (N'dentist1', N'1', N'Dentist')
INSERT [dbo].[Account] ([username], [password], [accountType]) VALUES (N'dentist2', N'2', N'Dentist')
INSERT [dbo].[Account] ([username], [password], [accountType]) VALUES (N'dentist3', N'3', N'Dentist')
INSERT [dbo].[Account] ([username], [password], [accountType]) VALUES (N'patient1', N'1', N'Patient')
INSERT [dbo].[Account] ([username], [password], [accountType]) VALUES (N'patient2', N'2', N'Patient')
INSERT [dbo].[Account] ([username], [password], [accountType]) VALUES (N'patient3', N'3', N'Patient')
INSERT [dbo].[Account] ([username], [password], [accountType]) VALUES (N'patient4', N' ', N'Patient')
INSERT [dbo].[Account] ([username], [password], [accountType]) VALUES (N'staff1', N'1', N'Staff')
INSERT [dbo].[Account] ([username], [password], [accountType]) VALUES (N'staff2', N'2', N'Staff')
INSERT [dbo].[Account] ([username], [password], [accountType]) VALUES (N'staff3', N'3', N'Staff')
GO
INSERT [dbo].[Admin] ([adminUserName], [adminPassword]) VALUES (N'A', N'1')
INSERT [dbo].[Admin] ([adminUserName], [adminPassword]) VALUES (N'B', N'2')
INSERT [dbo].[Admin] ([adminUserName], [adminPassword]) VALUES (N'C', N'3')
GO
INSERT [dbo].[Dentist] ([dentistFullName], [dentistUserName], [dentistPassword]) VALUES (N'A', N'dentist1', N'1')
INSERT [dbo].[Dentist] ([dentistFullName], [dentistUserName], [dentistPassword]) VALUES (N'B', N'dentist2', N'2')
INSERT [dbo].[Dentist] ([dentistFullName], [dentistUserName], [dentistPassword]) VALUES (N'C', N'dentist3', N'3')
GO
SET IDENTITY_INSERT [dbo].[Drug] ON 

INSERT [dbo].[Drug] ([drugId], [drugName], [indication], [expiredDate], [unit], [stockNumber], [price]) VALUES (1, N'A', N'A', CAST(N'2024-01-01' AS Date), N'A', 90, 1)
INSERT [dbo].[Drug] ([drugId], [drugName], [indication], [expiredDate], [unit], [stockNumber], [price]) VALUES (2, N'B', N'B', CAST(N'2024-01-01' AS Date), N'B', 85, 2)
INSERT [dbo].[Drug] ([drugId], [drugName], [indication], [expiredDate], [unit], [stockNumber], [price]) VALUES (3, N'C', N'C', CAST(N'2024-01-01' AS Date), N'C', 80, 3)
SET IDENTITY_INSERT [dbo].[Drug] OFF
GO
INSERT [dbo].[Patient] ([patientFullName], [patientPhoneNumber], [patientPassword], [patientDateOfBirth], [patientAddress]) VALUES (N'A', N'patient1', N'1', CAST(N'2023-12-11' AS Date), N'A')
INSERT [dbo].[Patient] ([patientFullName], [patientPhoneNumber], [patientPassword], [patientDateOfBirth], [patientAddress]) VALUES (N'B', N'patient2', N'2', CAST(N'2023-12-19' AS Date), N'B')
INSERT [dbo].[Patient] ([patientFullName], [patientPhoneNumber], [patientPassword], [patientDateOfBirth], [patientAddress]) VALUES (N'C', N'patient3', N'3', CAST(N'2023-12-10' AS Date), N'C')
INSERT [dbo].[Patient] ([patientFullName], [patientPhoneNumber], [patientPassword], [patientDateOfBirth], [patientAddress]) VALUES (N'D', N'patient4', N' ', CAST(N'2023-12-12' AS Date), N'D')
GO
INSERT [dbo].[patientDrugs] ([medicalRecordId], [drugId], [quantity]) VALUES (1, 1, 5)
INSERT [dbo].[patientDrugs] ([medicalRecordId], [drugId], [quantity]) VALUES (1, 2, 5)
INSERT [dbo].[patientDrugs] ([medicalRecordId], [drugId], [quantity]) VALUES (2, 1, 5)
INSERT [dbo].[patientDrugs] ([medicalRecordId], [drugId], [quantity]) VALUES (2, 3, 10)
INSERT [dbo].[patientDrugs] ([medicalRecordId], [drugId], [quantity]) VALUES (3, 2, 10)
INSERT [dbo].[patientDrugs] ([medicalRecordId], [drugId], [quantity]) VALUES (3, 3, 5)
GO
SET IDENTITY_INSERT [dbo].[patientMedicalRecords] ON 

INSERT [dbo].[patientMedicalRecords] ([medicalRecordId], [patientPhoneNumber], [examinationDate], [examinationTime]) VALUES (1, N'patient1', CAST(N'2023-12-10' AS Date), CAST(N'07:30:00' AS Time))
INSERT [dbo].[patientMedicalRecords] ([medicalRecordId], [patientPhoneNumber], [examinationDate], [examinationTime]) VALUES (2, N'patient1', CAST(N'2023-12-11' AS Date), CAST(N'09:00:00' AS Time))
INSERT [dbo].[patientMedicalRecords] ([medicalRecordId], [patientPhoneNumber], [examinationDate], [examinationTime]) VALUES (3, N'patient2', CAST(N'2023-12-12' AS Date), CAST(N'16:30:00' AS Time))
SET IDENTITY_INSERT [dbo].[patientMedicalRecords] OFF
GO
INSERT [dbo].[patientServices] ([medicalRecordId], [serviceId]) VALUES (1, 1)
INSERT [dbo].[patientServices] ([medicalRecordId], [serviceId]) VALUES (1, 2)
INSERT [dbo].[patientServices] ([medicalRecordId], [serviceId]) VALUES (2, 1)
INSERT [dbo].[patientServices] ([medicalRecordId], [serviceId]) VALUES (2, 2)
INSERT [dbo].[patientServices] ([medicalRecordId], [serviceId]) VALUES (2, 3)
INSERT [dbo].[patientServices] ([medicalRecordId], [serviceId]) VALUES (3, 2)
INSERT [dbo].[patientServices] ([medicalRecordId], [serviceId]) VALUES (3, 3)
GO
SET IDENTITY_INSERT [dbo].[Receipt] ON 

INSERT [dbo].[Receipt] ([receiptId], [medicalRecordId], [totalPrice], [paymentStatus]) VALUES (1, 1, 20, N'Unpaid')
INSERT [dbo].[Receipt] ([receiptId], [medicalRecordId], [totalPrice], [paymentStatus]) VALUES (2, 2, 41, N'Unpaid')
INSERT [dbo].[Receipt] ([receiptId], [medicalRecordId], [totalPrice], [paymentStatus]) VALUES (3, 3, 40, N'Unpaid')
SET IDENTITY_INSERT [dbo].[Receipt] OFF
GO
SET IDENTITY_INSERT [dbo].[scheduleAppointment] ON 

INSERT [dbo].[scheduleAppointment] ([appointmentId], [patientPhoneNumber], [appointmentDate], [appointmentTime], [dentistUserName]) VALUES (1, N'patient1', CAST(N'2023-12-10' AS Date), CAST(N'06:19:00' AS Time), N'dentist1')
INSERT [dbo].[scheduleAppointment] ([appointmentId], [patientPhoneNumber], [appointmentDate], [appointmentTime], [dentistUserName]) VALUES (2, N'patient1', CAST(N'2023-12-11' AS Date), CAST(N'07:25:00' AS Time), N'dentist1')
INSERT [dbo].[scheduleAppointment] ([appointmentId], [patientPhoneNumber], [appointmentDate], [appointmentTime], [dentistUserName]) VALUES (3, N'patient1', CAST(N'2023-12-11' AS Date), CAST(N'08:35:00' AS Time), N'dentist3')
INSERT [dbo].[scheduleAppointment] ([appointmentId], [patientPhoneNumber], [appointmentDate], [appointmentTime], [dentistUserName]) VALUES (4, N'patient2', CAST(N'2023-12-12' AS Date), CAST(N'16:25:00' AS Time), N'dentist2')
INSERT [dbo].[scheduleAppointment] ([appointmentId], [patientPhoneNumber], [appointmentDate], [appointmentTime], [dentistUserName]) VALUES (5, N'patient4', CAST(N'2023-12-11' AS Date), CAST(N'14:34:00' AS Time), N'dentist3')
INSERT [dbo].[scheduleAppointment] ([appointmentId], [patientPhoneNumber], [appointmentDate], [appointmentTime], [dentistUserName]) VALUES (12, N'patient2', CAST(N'2023-12-11' AS Date), CAST(N'16:43:00' AS Time), N'dentist2')
INSERT [dbo].[scheduleAppointment] ([appointmentId], [patientPhoneNumber], [appointmentDate], [appointmentTime], [dentistUserName]) VALUES (13, N'patient4', CAST(N'2023-12-12' AS Date), CAST(N'16:43:00' AS Time), N'dentist1')
SET IDENTITY_INSERT [dbo].[scheduleAppointment] OFF
GO
SET IDENTITY_INSERT [dbo].[Service] ON 

INSERT [dbo].[Service] ([serviceId], [serviceName], [price]) VALUES (1, N'X-ray', 1)
INSERT [dbo].[Service] ([serviceId], [serviceName], [price]) VALUES (2, N'Tooth filling', 2)
INSERT [dbo].[Service] ([serviceId], [serviceName], [price]) VALUES (3, N'Tooth check', 3)
SET IDENTITY_INSERT [dbo].[Service] OFF
GO
INSERT [dbo].[Staff] ([staffFullName], [staffUserName], [staffPassword]) VALUES (N'A', N'staff1', N'1')
INSERT [dbo].[Staff] ([staffFullName], [staffUserName], [staffPassword]) VALUES (N'B', N'staff2', N'2')
INSERT [dbo].[Staff] ([staffFullName], [staffUserName], [staffPassword]) VALUES (N'C', N'staff3', N'3')
GO
SET IDENTITY_INSERT [dbo].[workSchedule] ON 

INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (1, N'dentist1', CAST(N'2023-12-10' AS Date), CAST(N'06:00:00' AS Time), CAST(N'08:00:00' AS Time), N'Busy')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (2, N'dentist1', CAST(N'2023-12-10' AS Date), CAST(N'08:00:00' AS Time), CAST(N'10:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (3, N'dentist1', CAST(N'2023-12-10' AS Date), CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (4, N'dentist1', CAST(N'2023-12-10' AS Date), CAST(N'15:00:00' AS Time), CAST(N'17:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (5, N'dentist1', CAST(N'2023-12-11' AS Date), CAST(N'06:00:00' AS Time), CAST(N'08:00:00' AS Time), N'Busy')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (6, N'dentist1', CAST(N'2023-12-11' AS Date), CAST(N'08:00:00' AS Time), CAST(N'10:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (7, N'dentist1', CAST(N'2023-12-11' AS Date), CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (8, N'dentist1', CAST(N'2023-12-11' AS Date), CAST(N'15:00:00' AS Time), CAST(N'17:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (9, N'dentist1', CAST(N'2023-12-12' AS Date), CAST(N'06:00:00' AS Time), CAST(N'08:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (10, N'dentist1', CAST(N'2023-12-12' AS Date), CAST(N'08:00:00' AS Time), CAST(N'10:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (11, N'dentist1', CAST(N'2023-12-12' AS Date), CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (12, N'dentist1', CAST(N'2023-12-12' AS Date), CAST(N'15:00:00' AS Time), CAST(N'17:00:00' AS Time), N'Busy')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (13, N'dentist2', CAST(N'2023-12-10' AS Date), CAST(N'06:00:00' AS Time), CAST(N'08:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (14, N'dentist2', CAST(N'2023-12-10' AS Date), CAST(N'08:00:00' AS Time), CAST(N'10:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (15, N'dentist2', CAST(N'2023-12-10' AS Date), CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (16, N'dentist2', CAST(N'2023-12-10' AS Date), CAST(N'15:00:00' AS Time), CAST(N'17:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (17, N'dentist2', CAST(N'2023-12-11' AS Date), CAST(N'06:00:00' AS Time), CAST(N'08:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (18, N'dentist2', CAST(N'2023-12-11' AS Date), CAST(N'08:00:00' AS Time), CAST(N'10:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (19, N'dentist2', CAST(N'2023-12-11' AS Date), CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (20, N'dentist2', CAST(N'2023-12-11' AS Date), CAST(N'15:00:00' AS Time), CAST(N'17:00:00' AS Time), N'Busy')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (21, N'dentist2', CAST(N'2023-12-12' AS Date), CAST(N'06:00:00' AS Time), CAST(N'08:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (22, N'dentist2', CAST(N'2023-12-12' AS Date), CAST(N'08:00:00' AS Time), CAST(N'10:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (23, N'dentist2', CAST(N'2023-12-12' AS Date), CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (24, N'dentist2', CAST(N'2023-12-12' AS Date), CAST(N'15:00:00' AS Time), CAST(N'17:00:00' AS Time), N'Busy')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (25, N'dentist3', CAST(N'2023-12-10' AS Date), CAST(N'06:00:00' AS Time), CAST(N'08:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (26, N'dentist3', CAST(N'2023-12-10' AS Date), CAST(N'08:00:00' AS Time), CAST(N'10:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (27, N'dentist3', CAST(N'2023-12-10' AS Date), CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (28, N'dentist3', CAST(N'2023-12-10' AS Date), CAST(N'15:00:00' AS Time), CAST(N'17:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (29, N'dentist3', CAST(N'2023-12-11' AS Date), CAST(N'06:00:00' AS Time), CAST(N'08:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (30, N'dentist3', CAST(N'2023-12-11' AS Date), CAST(N'08:00:00' AS Time), CAST(N'10:00:00' AS Time), N'Busy')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (31, N'dentist3', CAST(N'2023-12-11' AS Date), CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), N'Busy')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (32, N'dentist3', CAST(N'2023-12-11' AS Date), CAST(N'15:00:00' AS Time), CAST(N'17:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (33, N'dentist3', CAST(N'2023-12-12' AS Date), CAST(N'06:00:00' AS Time), CAST(N'08:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (34, N'dentist3', CAST(N'2023-12-12' AS Date), CAST(N'08:00:00' AS Time), CAST(N'10:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (35, N'dentist3', CAST(N'2023-12-12' AS Date), CAST(N'13:00:00' AS Time), CAST(N'15:00:00' AS Time), N'Free')
INSERT [dbo].[workSchedule] ([scheduleId], [dentistUserName], [workingDate], [startTime], [endTime], [busyStatus]) VALUES (36, N'dentist3', CAST(N'2023-12-12' AS Date), CAST(N'15:00:00' AS Time), CAST(N'17:00:00' AS Time), N'Free')
SET IDENTITY_INSERT [dbo].[workSchedule] OFF
GO
/****** Object:  Index [uniqueMedicalRecordID_DrugID]    Script Date: 12/19/2023 8:15:38 PM ******/
ALTER TABLE [dbo].[patientDrugs] ADD  CONSTRAINT [uniqueMedicalRecordID_DrugID] UNIQUE NONCLUSTERED 
(
	[medicalRecordId] ASC,
	[drugId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Service__47795C01DF18CDBD]    Script Date: 12/19/2023 8:15:38 PM ******/
ALTER TABLE [dbo].[Service] ADD  CONSTRAINT [UQ__Service__47795C01DF18CDBD] UNIQUE NONCLUSTERED 
(
	[serviceName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Admin]  WITH CHECK ADD  CONSTRAINT [FK_AdminAccount] FOREIGN KEY([adminUserName])
REFERENCES [dbo].[Account] ([username])
GO
ALTER TABLE [dbo].[Admin] CHECK CONSTRAINT [FK_AdminAccount]
GO
ALTER TABLE [dbo].[Dentist]  WITH CHECK ADD  CONSTRAINT [FK_DentistAccount] FOREIGN KEY([dentistUserName])
REFERENCES [dbo].[Account] ([username])
GO
ALTER TABLE [dbo].[Dentist] CHECK CONSTRAINT [FK_DentistAccount]
GO
ALTER TABLE [dbo].[patientDrugs]  WITH CHECK ADD  CONSTRAINT [FK_PatientDrugs_Drug] FOREIGN KEY([drugId])
REFERENCES [dbo].[Drug] ([drugId])
GO
ALTER TABLE [dbo].[patientDrugs] CHECK CONSTRAINT [FK_PatientDrugs_Drug]
GO
ALTER TABLE [dbo].[patientDrugs]  WITH CHECK ADD  CONSTRAINT [FK_PatientDrugs_patientMedicalRecords] FOREIGN KEY([medicalRecordId])
REFERENCES [dbo].[patientMedicalRecords] ([medicalRecordId])
GO
ALTER TABLE [dbo].[patientDrugs] CHECK CONSTRAINT [FK_PatientDrugs_patientMedicalRecords]
GO
ALTER TABLE [dbo].[patientMedicalRecords]  WITH CHECK ADD  CONSTRAINT [FK_patientMedicalRecords_PatientAcc] FOREIGN KEY([patientPhoneNumber])
REFERENCES [dbo].[Patient] ([patientPhoneNumber])
GO
ALTER TABLE [dbo].[patientMedicalRecords] CHECK CONSTRAINT [FK_patientMedicalRecords_PatientAcc]
GO
ALTER TABLE [dbo].[Staff]  WITH CHECK ADD  CONSTRAINT [FK_StaffAccount] FOREIGN KEY([staffUserName])
REFERENCES [dbo].[Account] ([username])
GO
ALTER TABLE [dbo].[Staff] CHECK CONSTRAINT [FK_StaffAccount]
GO
USE [master]
GO
ALTER DATABASE [testConflict] SET  READ_WRITE 
GO
