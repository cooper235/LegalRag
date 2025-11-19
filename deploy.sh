#!/bin/bash

# Quick Deployment Script for Vercel
echo "🚀 Legal AI Judge - Vercel Deployment"
echo "======================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - Ready for Vercel deployment"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Click 'Add New' → 'Project'"
echo "   - Import your GitHub repository"
echo "   - Click 'Deploy'"
echo ""
echo "OR use Vercel CLI:"
echo "   npm i -g vercel"
echo "   vercel"
echo ""
echo "✨ Your app will be live in 2-3 minutes!"
echo ""
