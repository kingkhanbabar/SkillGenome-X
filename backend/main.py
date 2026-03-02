import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pandas as pd
import random
import json
import plotly.express as px
from sklearn.ensemble import IsolationForest

# ==========================================
# 1. SAFE AI IMPORT (Hybrid Switch)
# ==========================================
try:
    from sentence_transformers import SentenceTransformer, util
    NLP_AVAILABLE = True
    print("✅ NLP Library Found. AI Embeddings Enabled.")
except ImportError:
    NLP_AVAILABLE = False
    print("⚠️ NLP Library NOT found. Using Rule-Based Logic only.")

# ==========================================
# 2. GLOBAL STATE (The Application Memory)
# ==========================================
# Contains the old mode state PLUS the new Economic Forecast metrics
app_state = {
    "current_scenario": "LIVE",
    "market_trend": "STABLE 🟢",
    "target_state": "All India",
    "policy_active": "None",
    "economic_unlock": 12.5,
    "match_rate": 68.2,
    "market_gap": 31.8,
    "risk_score": 8.2
}

# ==========================================
# 3. APP CONFIGURATION
# ==========================================
app = FastAPI(title="SkillGenome X API", version="4.0.0 (Ultimate Command Center)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# 4. CONTROL ROOM & FORECAST ENDPOINTS
# ==========================================
@app.get("/api/sim/status")
def get_simulation_status():
    return app_state

@app.post("/api/sim/set/{scenario_type}")
def set_simulation(scenario_type: str):
    app_state["current_scenario"] = scenario_type
    if scenario_type == "invest_agri":
        app_state["market_trend"] = "BOOMING 🚀"
    elif scenario_type == "tech_crash":
        app_state["market_trend"] = "RECESSION 📉"
    else:
        app_state["market_trend"] = "STABLE 🟢"
    return {"status": "Updated", "mode": app_state["current_scenario"]}

class SimulationRequest(BaseModel):
    state: str
    policy: str

@app.post("/api/sim/run_forecast")
def run_forecast(req: SimulationRequest):
    """Runs the AI Forecast for the new Command Center UI"""
    app_state["target_state"] = req.state
    app_state["policy_active"] = req.policy
    
    if "Skilling" in req.policy:
        app_state["economic_unlock"] = round(random.uniform(250.0, 350.0), 1)
        app_state["match_rate"] = round(random.uniform(85.0, 92.0), 1)
        app_state["market_gap"] = round(100 - app_state["match_rate"], 1)
        app_state["risk_score"] = round(random.uniform(-7.0, -9.5), 1) 
    elif "Subsidies" in req.policy:
        app_state["economic_unlock"] = round(random.uniform(150.0, 200.0), 1)
        app_state["match_rate"] = round(random.uniform(75.0, 80.0), 1)
        app_state["market_gap"] = round(100 - app_state["match_rate"], 1)
        app_state["risk_score"] = round(random.uniform(-4.0, -6.0), 1)
    else:
        app_state["economic_unlock"] = 12.5
        app_state["match_rate"] = 68.2
        app_state["risk_score"] = 0.0

    return app_state

@app.get("/api/dashboard/metrics")
def get_metrics():
    return app_state

# ==========================================
# 5. NLP ENGINE (AI Brain)
# ==========================================
class NLP_Engine:
    def __init__(self):
        if NLP_AVAILABLE:
            print("🧠 NLP Engine: Loading AI Model...")
            self.model = SentenceTransformer('all-MiniLM-L6-v2')
            self.careers = [
                {"role": "Agri-Drone Pilot", "keywords": "flying drones aerial photography farming crop monitoring technology", "primary_skill": "Drone Ops"},
                {"role": "Farm Machinery Specialist", "keywords": "repairing engines tractors mechanics hydraulics welding heavy machinery", "primary_skill": "Tractor Repair"},
                {"role": "AI Engineer", "keywords": "coding programming python software machine learning data science neural networks", "primary_skill": "AI/ML"},
                {"role": "Smart Home Technician", "keywords": "installing wiring electricity solar panels iot sensors internet connection", "primary_skill": "IoT Installation"},
                {"role": "Sustainable Farmer", "keywords": "growing plants organic nature soil water conservation hydroponics greenhouse", "primary_skill": "Hydroponics"},
                {"role": "Cybersecurity Analyst", "keywords": "hacking security defending networks firewall protection digital forensics", "primary_skill": "Cybersecurity"}
            ]
            self.career_embeddings = self.model.encode([c['keywords'] for c in self.careers])

    def find_match(self, user_text):
        if not NLP_AVAILABLE: return None
        user_embedding = self.model.encode(user_text)
        scores = util.cos_sim(user_embedding, self.career_embeddings)[0]
        best_idx = int(scores.argmax())
        if float(scores[best_idx]) > 0.25: 
            return {
                "role": self.careers[best_idx]['role'],
                "skill_needed": self.careers[best_idx]['primary_skill'],
                "score": int(float(scores[best_idx]) * 100),
                "reason": f"AI matched your interest in '{user_text}' via Semantic Search."
            }
        return None

nlp_brain = NLP_Engine()

# ==========================================
# 6. CORE DATA LOGIC (The heavy lifters are back!)
# ==========================================
class DataGenerator:
    def __init__(self):
        self.regions = ['Urban Metro', 'Rural Agri-Hub', 'Remote Hills', 'Industrial Belt']
        self.manual_skills = ['Tractor Repair', 'Drone Ops', 'Solar Install', 'Hydroponics', 'Welding', 'Mechanic']
        try:
            self.real_df = pd.read_csv('real_skills.csv')
            col = 'LanguageHaveWorkedWith' if 'LanguageHaveWorkedWith' in self.real_df.columns else 'LanguageWorkedWith'
            self.real_df = self.real_df.dropna(subset=['Country', col])
            self.real_col = col
            self.use_real_data = True
        except:
            self.use_real_data = False

    def generate_data(self, sim_count=1200, kaggle_count=600):
        sim_data = []
        for _ in range(sim_count):
            if random.random() < 0.15:
                sim_data.append({'region': 'Unknown', 'skill': 'SpamBot', 'activity_score': 15000, 'is_bot': True})
            else:
                region = random.choice(self.regions)
                if region == 'Rural Agri-Hub': skill = random.choice(['Tractor Repair', 'Drone Ops', 'Solar Install'])
                elif region == 'Urban Metro': skill = random.choice(['Python', 'React', 'AI/ML'])
                else: skill = random.choice(self.manual_skills)
                sim_data.append({'region': region, 'skill': skill, 'activity_score': random.randint(10, 500), 'is_bot': False})

        kaggle_data = []
        if self.use_real_data:
            samples = self.real_df.sample(n=kaggle_count, replace=True)
            for _, row in samples.iterrows():
                s = str(row[self.real_col]).split(';')[0]
                kaggle_data.append({'region': str(row['Country']), 'skill': s, 'activity_score': random.randint(20, 100), 'is_bot': False})

        return pd.DataFrame(sim_data), pd.DataFrame(kaggle_data)

class AdversarialFilter:
    def filter_bots(self, df):
        if df.empty: return df, 0
        model = IsolationForest(contamination=0.15, random_state=42)
        df['anomaly_pred'] = model.fit_predict(df[['activity_score']])
        clean_df = df[df['anomaly_pred'] == 1].copy()
        return clean_df, len(df) - len(clean_df)

class MapVisualizer:
    def generate_india_map(self):
        data = {'State': ['Karnataka', 'Maharashtra', 'Telangana', 'Tamil Nadu'], 'Skill_Score': [95, 88, 82, 75]}
        df = pd.DataFrame(data)
        fig = px.choropleth(df, geojson="https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson", featureidkey='properties.ST_NM', locations='State', color='Skill_Score', color_continuous_scale='RdBu')
        fig.update_geos(fitbounds="locations", visible=False)
        fig.update_layout(margin={"r":0,"t":0,"l":0,"b":0}, paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)', geo=dict(bgcolor='rgba(0,0,0,0)'), font=dict(color="white"))
        return json.loads(fig.to_json())

class ClusterAnalysisEngine:
    def get_cluster_data(self):
        return [
            {
                "name": "Future Tech",
                "children": [
                    {"name": "AI/ML", "size": random.randint(80, 100), "fill": "#8884d8"},
                    {"name": "Python", "size": random.randint(70, 90), "fill": "#83a6ed"},
                    {"name": "React", "size": random.randint(60, 85), "fill": "#8dd1e1"},
                    {"name": "Cybersec", "size": random.randint(50, 80), "fill": "#82ca9d"},
                ]
            },
            {
                "name": "Agri-Tech",
                "children": [
                    {"name": "Drone Ops", "size": random.randint(70, 95), "fill": "#a4de6c"},
                    {"name": "Smart Farming", "size": random.randint(60, 90), "fill": "#d0ed57"},
                    {"name": "Hydroponics", "size": random.randint(50, 85), "fill": "#ffc658"},
                ]
            },
            {
                "name": "Essential Trades",
                "children": [
                    {"name": "Solar Install", "size": random.randint(65, 90), "fill": "#ff8042"},
                    {"name": "Tractor Repair", "size": random.randint(60, 85), "fill": "#ffbb28"},
                    {"name": "Welding", "size": random.randint(55, 80), "fill": "#d0ed57"},
                ]
            }
        ]

# ==========================================
# 7. MAIN ORCHESTRATOR
# ==========================================
class SkillGenomeEngine:
    def __init__(self):
        self.generator = DataGenerator()
        self.defense = AdversarialFilter()

    def run_pipeline(self):
        current_mode = app_state["current_scenario"]
        
        sim_df, kaggle_df = self.generator.generate_data()
        clean_sim, bots = self.defense.filter_bots(sim_df)

        if current_mode == "invest_agri":
            boost = clean_sim[clean_sim['skill'].isin(['Tractor Repair', 'Drone Ops'])]
            clean_sim = pd.concat([clean_sim, boost, boost])
        elif current_mode == "tech_crash":
            clean_sim = clean_sim[~clean_sim['skill'].isin(['Python', 'React'])]

        sim_regions = clean_sim['region'].value_counts().reset_index()
        sim_regions.columns = ['name', 'value']
        sim_skills = clean_sim['skill'].value_counts().reset_index()
        sim_skills.columns = ['name', 'value']
        
        graph_links = []
        top = sim_skills['name'].head(6).tolist()
        for i in range(len(top)):
            graph_links.append({"source": top[i], "target": top[(i+1)%len(top)]})
        if current_mode == "invest_agri":
            graph_links.append({"source": "AI/ML", "target": "Tractor Repair"})

        kaggle_skills = []
        kaggle_countries = []
        if not kaggle_df.empty:
            k_skills = kaggle_df['skill'].value_counts().head(10).reset_index()
            k_skills.columns = ['name', 'value']
            kaggle_skills = k_skills.to_dict(orient='records')
            k_countries = kaggle_df['region'].value_counts().head(10).reset_index()
            k_countries.columns = ['name', 'value']
            kaggle_countries = k_countries.to_dict(orient='records')

        gap_data = [
            {"name": "Cybersecurity", "supply": 12, "demand": 95, "solution": "🚀 Launch Training Program"},
            {"name": "Blockchain", "supply": 18, "demand": 88, "solution": "🤝 Hire from Metro Hubs"},
            {"name": "Rust", "supply": 8, "demand": 75, "solution": "🎓 University Partnership"},
            {"name": "Cobol", "supply": 5, "demand": 60, "solution": "👴 Recall Retirees"},
            {"name": "Quantum Comp", "supply": 2, "demand": 50, "solution": "🔬 Research Grant"}
        ]
        
        if current_mode == "tech_crash":
             gap_data = [
                {"name": "Welding", "supply": 5, "demand": 99, "solution": "🔥 CRITICAL NEED - Train Now"},
                {"name": "Farming", "supply": 15, "demand": 80, "solution": "🌾 Rural Incentive Program"}
            ]

        return {
            "meta": app_state, 
            "stats": {"total_signals": len(sim_df)+len(kaggle_df), "bots_blocked": bots, "valid_signals": len(clean_sim)+len(kaggle_df)},
            "regional_data": sim_regions.to_dict('records'),
            "skill_data": sim_skills.head(10).to_dict('records'),
            "graph_data": {"links": graph_links},
            "kaggle_skills": kaggle_skills,
            "kaggle_countries": kaggle_countries,
            "gap_data": gap_data 
        }

# ==========================================
# 8. API ENDPOINTS
# ==========================================
engine = SkillGenomeEngine()
map_viz = MapVisualizer()
cluster_engine = ClusterAnalysisEngine()

@app.get("/api/dashboard")
def get_dashboard(): return engine.run_pipeline()

@app.get("/api/simulate/{scenario}")
def get_sim(scenario: str): return engine.run_pipeline() 

@app.get("/api/heatmap")
def get_map(): return map_viz.generate_india_map()

@app.get("/api/clusters")
def get_clusters(): return cluster_engine.get_cluster_data()

class UserProfile(BaseModel):
    region: str
    current_skills: List[str] 

@app.post("/api/recommend")
def recommend_career(user: UserProfile):
    suggestions = []
    user_text = " ".join(user.current_skills)
    ai_match = nlp_brain.find_match(user_text)
    
    candidate = None
    if ai_match:
        candidate = ai_match
        candidate['badge'] = "AI MATCH 🧠"
    elif "farm" in user_text.lower() or user.region == "Rural Agri-Hub":
        candidate = {"role": "Agri-Drone Pilot", "skill_needed": "Drone Ops", "score": 90, "reason": "High local utility.", "badge": "LOCAL 📍"}
    else:
        candidate = {"role": "Smart Infra Tech", "skill_needed": "IoT Installation", "score": 75, "reason": "General demand.", "badge": "ENTRY 🚪"}

    needed = candidate.get("skill_needed", "General")
    skill_supply_map = {"Rural Agri-Hub": ["Tractor Repair"], "Urban Metro": ["Python", "AI/ML"]}
    user_supply = skill_supply_map.get(user.region, [])
    
    strategy = ""
    if needed in user_supply:
         strategy = f"✅ Skill Match: '{needed}' is available here."
    else:
         strategy = f"❌ Critical Shortage: '{needed}' is missing.\n👉 Strategy: Launch Training / Hire Remote."

    candidate['reason'] = candidate['reason'] + "\n\n" + strategy
    suggestions.append(candidate)
    return {"recommendations": suggestions}

if __name__ == "__main__":
    print("🚀 SkillGenome AI Engine Starting...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)