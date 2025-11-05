import networkx as nx
import matplotlib.pyplot as plt
import pygraphviz as pgv
from networkx.drawing.nx_agraph import to_agraph

# Create a directed graph
G = nx.DiGraph()

# Central node
central_node = "Industrial Design"
G.add_node(central_node, shape="circle", style="filled", fillcolor="lightblue", fontsize=14, fontweight="bold", width=1.5)

# List of 32 industries from the Career Explorer
industries = [
    "Consumer Electronics",
    "Automotive",
    "Medical Devices",
    "Furniture",
    "Packaging",
    "Home Appliances",
    "Fashion and Accessories",
    "Sporting Goods",
    "Toy Manufacturing",
    "Aerospace",
    "Architecture",
    "Entertainment/Concept Art",
    "Retail",
    "Transportation",
    "Lighting Design",
    "Sustainable Design",
    "Wearable Technology",
    "Food and Beverage",
    "Defense and Security",
    "Footwear",
    "Bio-Design and Biomimicry",
    "Smart Home Devices",
    "Virtual and Augmented Reality",
    "Internet of Things",
    "Generative Design",
    "Robotics",
    "Personalized Nutrition",
    "Off-Grid Living Solutions",
    "Quantum Computing Interfaces",
    "Metaverse-Ready Wearables",
    "Design for Aging Populations",
    "Circular Economy Products"
]

# Add industries as nodes and connect to central node
for industry in industries:
    G.add_node(industry, shape="circle", style="filled", fillcolor="lightgreen", fontsize=8, width=0.8)
    G.add_edge(central_node, industry)

# Convert to pygraphviz graph for SVG output
A = to_agraph(G)

# Set graph attributes for radial layout
A.graph_attr.update(rankdir="LR", size="16,9!", ratio="fill", margin="0")
A.node_attr.update(fixedsize="true")
A.layout(prog="twopi")  # Radial layout

# Save as SVG
A.draw("industrial_design_radial_tree.svg")

# Optional: Preview with matplotlib (comment out if not needed)
plt.figure(figsize=(16, 9))
pos = nx.spring_layout(G, seed=42, k=0.9)
nx.draw_networkx_nodes(G, pos, nodelist=[central_node], node_color="lightblue", node_size=5000)
nx.draw_networkx_nodes(G, pos, nodelist=industries, node_color="lightgreen", node_size=2000)
nx.draw_networkx_edges(G, pos, edge_color="gray", width=1.5)
nx.draw_networkx_labels(G, pos, labels={central_node: central_node}, font_size=14, font_weight="bold")
label_pos = {node: (x, y * 1.1) for node, (x, y) in pos.items()}
nx.draw_networkx_labels(G, label_pos, labels={node: node for node in industries}, font_size=8)
plt.title("Industrial Design Industries", fontsize=16)
plt.axis("off")
plt.tight_layout()
plt.savefig("industrial_design_radial_tree.png", format="png", dpi=300, bbox_inches="tight")
plt.close()