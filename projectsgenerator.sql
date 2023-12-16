/* Generate randoms strings for project.description */ 
UPDATE projects
SET description = SUBSTRING(MD5(RAND()) FROM 1 FOR 100);