git stash && git pull -f && yarn

if [ "$ENV" == "alpha" ]; then
  yarn start-alpha
elif [ "$ENV" == "prod" ]; then
  yarn build && yarn start-prod
else
  yarn dev
fi
