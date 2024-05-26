echo "DID YOU MAKE SURE ALL OF THE URLS ARE CORRECT?"
echo "** BUILDING **"
npm run build-frontend
echo "** DEPLOYING **"
aws s3 sync frontend/build s3://kwur.wustl.edu
# aws s3 mv frontend/404.html s3://kwur.wustl.edu
echo "** ALL DONE **"
