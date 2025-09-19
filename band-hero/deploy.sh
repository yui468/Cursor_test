#!/bin/bash

# Band Hero - Vercel Deployment Script
echo "🎸 Band Hero - Vercel Deployment Script 🎸"
echo "============================================="

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
else
    echo "✅ Vercel CLI found"
fi

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found. Make sure you're in the band-hero directory."
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo "📋 Files to deploy:"
ls -la

echo ""
echo "🚀 Starting deployment..."
echo "Choose deployment type:"
echo "1) Preview deployment (default)"
echo "2) Production deployment"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
    2)
        echo "🌟 Deploying to production..."
        vercel --prod
        ;;
    *)
        echo "👀 Deploying preview..."
        vercel
        ;;
esac

echo ""
echo "✨ Deployment completed!"
echo "🎮 Your Band Hero game should now be live on Vercel!"
echo ""
echo "Next steps:"
echo "1. Test the deployed game"
echo "2. Share the URL with friends"
echo "3. Rock on! 🤘"