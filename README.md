# Security Policy Control Portal – BRS Networks

Detta projekt är en modern, multi-tenant styrportal som utvecklas av **BRS Networks**. Den används för att centralt hantera säkerhetspolicys som Microsoft Secure Score, Intune compliance och Microsoft Defender-inställningar – direkt från ett snyggt och snabbt React-baserat gränssnitt.

Projektet bygger på Tailwind CSS och React, men är helt anpassat till vår egen design, behov och Microsofts säkerhets-API:er.

---

## 🧭 Projektöversikt

Portalens syfte:
- 📈 Övervaka Secure Score från Microsoft Graph API
- ✅ Skapa och redigera Intune device compliance policies
- 🛡️ Ändra Microsoft Defender inställningar för flera tenants
- 🌐 Multi-tenant access med Azure Lighthouse
- 👥 Ge kollegor central åtkomst via Azure AD B2C

---

## 🔧 Teknikstack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: .NET 8 Web API eller Azure Functions (ej i detta repo)
- **Auth**: Azure AD B2C med MSAL.js
- **Data**: Azure Cosmos DB
- **API**: Microsoft Graph API

---

## 🚀 Komma igång (lokalt)

### Förutsättningar

Se till att du har följande installerat:

- **Node.js 18+** (helst 20+)
- **npm** eller **yarn**

### Installation

1. Klona detta repo:

   ```bash
   git clone https://github.com/MirzaMuhicBRS/securityscore.git
   cd securityscore
