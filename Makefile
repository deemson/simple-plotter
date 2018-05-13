TOP_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
NM:=$(TOP_DIR)/node_modules
NM_BIN:=$(NM)/.bin

default:
	@echo No tasks were specified, stopping

.PHONY: clean clean-deps webpack dev-server lint

clean:
	rm -rf $(TOP_DIR)/dist

clean-deps:
	rm -rf $(NM)
	rm -rf $(TOP_DIR)/package-lock.json
webpack:
	$(NM_BIN)/webpack-cli

dev-server:
	$(NM_BIN)/webpack-dev-server

lint:
	$(NM_BIN)/tslint $(TOP_DIR)/src/**/*.ts*