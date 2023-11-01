IMG = 1.4
DOCKER_USER = user
DOCKER_PSWD = psswd

docker:
	$(call buildfn)

define buildfn
  docker build -t vigcom:$(IMG) . --no-cache
  docker tag vigcom:$(IMG) raquelvaladaojs/vigcom:$(IMG)
  docker push raquelvaladaojs/vigcom:$(IMG)
endef
