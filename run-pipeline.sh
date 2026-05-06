#!/bin/bash
# SEO Content Pipeline Runner
# Usage: ./run-pipeline.sh [options]
# Options:
#   --skip-generate    Skip post generation
#   --skip-submit      Skip GSC submission
#   --keywords-only    Only extract keywords
#   --health-only      Only run health check

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

SKIP_GENERATE=false
SKIP_SUBMIT=false
KEYWORDS_ONLY=false
HEALTH_ONLY=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --skip-generate)
            SKIP_GENERATE=true
            shift
            ;;
        --skip-submit)
            SKIP_SUBMIT=true
            shift
            ;;
        --keywords-only)
            KEYWORDS_ONLY=true
            shift
            ;;
        --health-only)
            HEALTH_ONLY=true
            shift
            ;;
        *)
            log_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

if [[ -z "$GSC_SERVICE_ACCOUNT_KEY" ]]; then
    log_warn "GSC_SERVICE_ACCOUNT_KEY not set. Some features may not work."
fi

log_info "Starting SEO Content Pipeline..."

if [[ "$KEYWORDS_ONLY" == true ]]; then
    log_info "Running keywords extraction only..."
    npm run seo:keywords
    log_info "Keywords extraction complete"
    exit 0
fi

if [[ "$HEALTH_ONLY" == true ]]; then
    log_info "Running health check only..."
    npm run seo:health
    log_info "Health check complete"
    exit 0
fi

if [[ "$SKIP_GENERATE" != true ]]; then
    log_info "Step 1: Generate SEO Posts"
    npm run seo:generate
fi

if [[ "$SKIP_SUBMIT" != true ]]; then
    log_info "Step 2: Submit to Google Search Console"
    npm run seo:submit
fi

log_info "Step 3: Check for Broken Links"
npm run seo:fix

log_info "Pipeline complete!"
