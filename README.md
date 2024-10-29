## New KWUR Website because the last one was so old the dependencies reached EOL and it was annoying to maintain ##
Built May 2024 (please don't wait until May 2034 before updating the site) using MERN stack (Mongo, Express, React, Node). It is meant to replace both the old scheduler site and the old static site. This should hopefully allow DJs to schedule and show content to listeners on one hub.

The site is hosted using a S3 bucket (which means it is static, React will build into JS code before it is deployed), and connects to the backend (separate repo) hosted with Heroku.

If something breaks, it's not my fault. 
