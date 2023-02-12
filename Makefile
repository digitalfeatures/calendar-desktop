BUILD_REMOTE_REPOSITORIES := "https://github.com/digitalfeatures/calendar.git"

BUILD_CACHE_DIR := ".view"

BUILD_CACHE_DIR_OUTPUT :=  "${BUILD_CACHE_DIR}/dist"

APPLICATION_DIR_PATH := "./src/application"

init:
	git clone --depth 1 --branch main ${BUILD_REMOTE_REPOSITORIES} ${BUILD_CACHE_DIR}
	cd ${BUILD_CACHE_DIR} && npm install
	cd ${BUILD_CACHE_DIR} && npm run build
	rm -rf ${APPLICATION_DIR_PATH}
	cp -r  ${BUILD_CACHE_DIR_OUTPUT} ${APPLICATION_DIR_PATH}
	rm -rf ${BUILD_CACHE_DIR}
	sed -e 's/="\//=".\//g' ${APPLICATION_DIR_PATH}/index.html >  ${APPLICATION_DIR_PATH}/index.tmp.html
	mv ${APPLICATION_DIR_PATH}/index.tmp.html  ${APPLICATION_DIR_PATH}/index.html \
		&& rm -rf ${APPLICATION_DIR_PATH}/index.tmp.html
	node ./scripts/loading.js

