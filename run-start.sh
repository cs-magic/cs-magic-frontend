if [ "$ENV" == "alpha" ]; then
  git stash && git pull -f && yarn
  yarn build && yarn start-alpha
elif [ "$ENV" == "prod" ]; then
  yarn start-prod
else
  yarn dev
fi
