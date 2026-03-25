ifeq ($(OS),Windows_NT)
PNPM_DEFAULT := $(subst \,/,$(LOCALAPPDATA))/pnpm/pnpm.CMD
else
PNPM_DEFAULT := pnpm
endif

PNPM ?= $(PNPM_DEFAULT)

.PHONY: install build typecheck dev run

install:
	$(PNPM) install

build:
	$(PNPM) --dir backend build
	$(PNPM) --dir desktop-client build

typecheck:
	$(PNPM) --dir backend typecheck
	$(PNPM) --dir desktop-client typecheck

dev:
	$(PNPM) exec concurrently -k -n backend,desktop -c green,blue "$(PNPM) --dir backend dev" "$(PNPM) --dir desktop-client dev"

run: dev

help:
	@echo "Available targets:"
	@echo "  install    - Install dependencies for both backend and desktop client"
	@echo "  build      - Build both backend and desktop client"
	@echo "  typecheck  - Run type checking for both backend and desktop client"
	@echo "  dev        - Start development servers for both backend and desktop client concurrently"
	@echo "  run        - Alias for 'dev'"
	@echo "  help       - Show this help message"
