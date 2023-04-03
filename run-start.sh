git stash && git pull -f

yarn

if [ "$ENV" == "prod" ];
then
  yarn build && yarn start
else
  yarn dev
fi
