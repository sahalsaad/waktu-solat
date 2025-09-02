# Waktu Solat App - Documentation Index

## 📋 Documentation Structure

This documentation has been split into two focused files for better maintainability:

### 📖 **[Project Knowledge Base](./project-knowledge.md)**
**Static technical documentation** - Updated when architecture or design patterns change
- Project overview & technology stack
- Design system & visual patterns  
- Current project structure
- API integration & caching architecture
- Data structures & TypeScript interfaces
- Date handling system
- Prayer logic & display rules
- Dependencies & build status
- Known issues & technical debt
- Future development roadmap

### 📈 **[Session Progress History](./session-progress.md)**
**Dynamic session tracking** - Updated after each development session
- Current session accomplishments
- Previous session accomplishments
- Session testing results
- Performance metrics
- Cumulative progress summary

## 🔄 Maintenance Guidelines

### **For Developers:**
1. **Before starting work:** Read both documents to understand current state
2. **During development:** Make notes of changes and decisions
3. **After completing work:** 
   - Update `session-progress.md` with new session accomplishments
   - Update `project-knowledge.md` if architecture/patterns changed
   - Move previous "Current Session" to "Previous Session Accomplishments"

### **Documentation Workflow:**
1. **Technical Changes** → Update `project-knowledge.md`
2. **Feature Implementation** → Add to `session-progress.md`
3. **Architecture Decisions** → Document in `project-knowledge.md`
4. **Session Completion** → Record results in `session-progress.md`

## 📊 Quick Status Overview

**Last Updated:** September 2, 2025  
**Current Status:** ✅ Fully functional app with monthly caching & complete Malaysian zone coverage  
**Recent Major Changes:** Monthly prayer time caching system, 77 Malaysian zones, optional prayer toggles  
**Active Issues:** TypeScript compilation warnings (non-blocking)  
**Next Priorities:** Notification implementation, TypeScript fixes, accessibility improvements

---

*For detailed technical information, see [project-knowledge.md](./project-knowledge.md)*  
*For session-by-session progress, see [session-progress.md](./session-progress.md)*
