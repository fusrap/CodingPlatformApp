# CodingPlatformApp

## Setup:

Project:
* Init: `ng new learning-portal-app`
* Run: `ng servce`

Prime Ng:
* Install: `npm install primeng primeicons primeflex`
* import css (`angular.json`):
                "styles": [
              "src/styles.css",
              "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
              "node_modules/primeng/resources/primeng.min.css",
              "node_modules/primeflex/primeflex.css"
            ],

## Routing
1. Add routes to `app.routes` 
    e.g.
        export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }};

2. Add `<router-outlet></router-outlet>` to where the route should be loaded
    the case `app.component.htlm`

## Login
https://youtu.be/nTWZB8bWAJE

Init components:
* ng g c components/login
* ng g c components/register
* ng g c components/home
* ng g s services/auth
* ng g g guards/auth
* ng g i interfaces/auth

# DB setup
-- Remove tables if they already exist
DROP TABLE IF EXISTS CourseElement;
DROP TABLE IF EXISTS TextElement;
DROP TABLE IF EXISTS InputElement;
DROP TABLE IF EXISTS Course;

-- Course table: remains unchanged
CREATE TABLE Course (
    course_id BIGINT PRIMARY KEY IDENTITY(1,1), 
    course_title NVARCHAR(255) NOT NULL, 
    course_description NVARCHAR(MAX), 
    created DATETIME DEFAULT GETDATE() 
);

-- CourseElement: links course to elements
CREATE TABLE CourseElement (
    course_element_id BIGINT PRIMARY KEY IDENTITY(1,1), 
    course_id BIGINT NOT NULL, 
    element_id BIGINT NOT NULL, 
    element_type NVARCHAR(50) NOT NULL, -- Identifies the type of element (e.g., 'Text', 'Input')
    created DATETIME DEFAULT GETDATE(), 
    CONSTRAINT FK_CourseElement_Course FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE
);

-- TextElement table
CREATE TABLE TextElement (
    text_element_id BIGINT PRIMARY KEY IDENTITY(1,1), 
    text NVARCHAR(MAX) NOT NULL
);

-- InputElement table
CREATE TABLE InputElement (
    input_element_id BIGINT PRIMARY KEY IDENTITY(1,1), 
    label NVARCHAR(255) NOT NULL, 
    answer NVARCHAR(255)
);


select * from Course
select * from CourseElement
select * from TextElement
select * from InputElement

CREATE TABLE Jeopardy (
    jeopardy_id INT IDENTITY(1,1) PRIMARY KEY,
    jeopardy_title NVARCHAR(255) NOT NULL,
    jeopardy_description NVARCHAR(MAX) NULL,
    created DATETIME DEFAULT GETDATE()
);

CREATE TABLE Subjects (
    subject_Id INT IDENTITY(1,1) PRIMARY KEY,
    subject_name NVARCHAR(255) NOT NULL,
    subject_jeopardy_id INT NOT NULL,
    FOREIGN KEY (subject_jeopardy_id) REFERENCES Jeopardy(jeopardy_id) ON DELETE CASCADE
);

CREATE TABLE JeopardyCells (
    jeopardy_cell_id INT IDENTITY(1,1) PRIMARY KEY,
    jeopardy_cell_value INT NOT NULL,
    jeopardy_cell_question NVARCHAR(MAX) NOT NULL,
    jeopardy_cell_answer NVARCHAR(MAX) NOT NULL,
    RowNumber INT NOT NULL,
    ColumnNumber INT NOT NULL,
    jeopardy_cell_jeopardy_id INT NOT NULL,
    FOREIGN KEY (jeopardy_cell_jeopardy_id) REFERENCES Jeopardy(jeopardy_id) ON DELETE CASCADE
);

CREATE INDEX IDX_Subjects_Jeopardy_Id ON Subjects(subject_Id);
CREATE INDEX IDX_JeopardyCells_Jeopardy_Id ON JeopardyCells(jeopardy_cell_id);

select * from Jeopardy
select * from JeopardyCells
select * from Subjects

## DB Migration

migration:
python -m sqlacodegen "mssql+pyodbc://user:pass@code-crafting-lab-db.database.windows.net:1433/coding-craftlab-storage?driver=ODBC+Driver+17+for+SQL+Server&Encrypt=yes&TrustServerCertificate=Yes&ConnectionTimeout=30" --outfile models.py   