def calculate_risk(age, breakdowns, avg_time):
    return min(100, (age * 0.4) + (breakdowns * 0.4) + (avg_time * 0.2))
