# Règles du bowling

## Vocabulaire
Frame/round : une colonne du tableau, donc composé de 2 lancés maximum (cas particulier pour le 10ème)
Score : score total d'un round

## Points
### Round normal
2 cases: sous_total_1, sous_total_2

* **Cas usuel**
    - 0 <= *sous_total_1* < 10
    - 10 - *sous_total_1* <= *sous_total_2* < 10
    - Score = *sous_total_1* + *sous_total_2*
    <br>

* **Spare** (toutes les quilles en 2 coups)
    - 0 <= *sous_total_1* < 10
    - sous_total_2 = 10 - *sous_total_1*
    - Score = 10 + NextRound.sous_total_1
    <br>

* **Strike** (toutes les quilles du premier coup)
    - sous_total_1 = 10
    - sous_total_2 = NULL       -> On saute ce lancé en conséquence
    - Score = 10 + NextRound.Score
    /!\ Score <= 30     (si on enchaine plus de 3 Strikes, le round aura un score de 30)

### Round final / round 10
3 cases: *sous_total_1*, *sous_total_2*, *bonus*

* **Cas usuel**
    => Pas de bonus
    - 0 <= *sous_total_1* < 10
    - 10 - *sous_total_1* <= *sous_total_2* < 10
    - Score = *sous_total_1* + *sous_total_2*
    <br>

* **Spare** (toutes les quilles en 2 coups)
    => 1 lancé bonus à réaliser, stocké dans *bonus*
    - 0 <= *sous_total_1* < 10
    - sous_total_2 = 10 - *sous_total_1*
    - Score = 10 + *bonus*
    <br>

* **Strike** (toutes les quilles du premier coup)
    => 2 lancés bonus, stockés dans *sous_total_2* et *bonus*
    - sous_total_1 = 10
    - Score = 10 + *sous_total_2* + *bonus*
    /!\ Les deux lancés bonus sont indépendants l'un de l'autre (aka. pas de spare possible en combinant *sous_total_2* et *bonus*)