# Complete Training Code

## Full Implementation - Copy & Run

```python
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score, mean_squared_error
import matplotlib.pyplot as plt
import seaborn as sns

# ============================================================================
# STEP 1: LOAD AND PREPARE DATA
# ============================================================================

def load_historical_data(historical_data, final_points_by_season):
    """
    Convert nested dictionary structure to flat DataFrame

    Parameters:
    -----------
    historical_data : dict
        Nested dict: {season: {round: {team_id: {stats}}}}
    final_points_by_season : dict
        Dict: {season: {team_name: final_points}}

    Returns:
    --------
    pd.DataFrame : Flat table with all training data
    """

    rows = []

    for season, rounds_data in historical_data.items():
        for round_num, teams_data in rounds_data.items():
            for team_id, team_stats in teams_data.items():
                
                team_name = team_stats['name']
                
                # Get final points for this team in this season
                final_pts = final_points_by_season[season][team_name]
                
                # Create row with all features
                row = {
                    'team': team_name,
                    'season': season,
                    'round': round_num,
                    'games_played': team_stats['games_played'],
                    'goal_difference': team_stats['goal_difference'],
                    'goals_scored': team_stats['goals_scored'],
                    'goals_conceded': team_stats['goals_conceded'],
                    'goals_scored_per_game': team_stats['goals_scored_per_game'],
                    'goals_conceded_per_game': team_stats['goals_conceded_per_game'],
                    'points_per_game': team_stats['points_per_game'],
                    'win_rate': team_stats['win_rate'],
                    'last_5_games_points': team_stats['last_5_games_points'],
                    'home_win_rate': team_stats['home_win_rate'],
                    'away_win_rate': team_stats['away_win_rate'],
                    'points': team_stats['points'],
                    'final_points': final_pts  # TARGET
                }
                
                rows.append(row)

    df = pd.DataFrame(rows)
    return df


# ============================================================================
# STEP 2: DATA VALIDATION
# ============================================================================

def validate_data(df):
    """
    Sanity checks on the data
    """
    print("=" * 70)
    print("DATA VALIDATION")
    print("=" * 70)
    
    print(f"\nTotal samples: {len(df)}")
    print(f"Expected: ~500 (5 seasons × 20 teams × 5 rounds)")
    
    print(f"\nSamples per season:")
    print(df.groupby('season').size())
    
    print(f"\nSamples per round:")
    print(df.groupby('round').size())
    
    print(f"\nUnique teams: {df['team'].nunique()}")
    
    print(f"\nFeature ranges:")
    print(df[['games_played', 'points_per_game', 'win_rate', 
              'goal_difference', 'final_points']].describe())
    
    print(f"\nMissing values:")
    print(df.isnull().sum())
    
    # Check for data leakage
    print(f"\nData leakage check (points vs final_points gap):")
    df['points_gap'] = df['final_points'] - df['points']
    print(df.groupby('round')['points_gap'].describe()[['mean', 'min', 'max']])
    
    print("\n✅ Validation complete!\n")


# ============================================================================
# STEP 3: FEATURE ENGINEERING
# ============================================================================

def prepare_features(df):
    """
    Define feature columns and target
    """
    
    feature_cols = [
        'games_played',
        'goal_difference',
        'goals_scored',
        'goals_conceded',
        'goals_scored_per_game',
        'goals_conceded_per_game',
        'points_per_game',
        'win_rate',
        'last_5_games_points',
        'home_win_rate',
        'away_win_rate'
    ]
    
    target_col = 'final_points'
    
    # Extract features and target
    X = df[feature_cols]
    y = df[target_col]
    
    return X, y, feature_cols


# ============================================================================
# STEP 4: TRAIN/TEST SPLIT
# ============================================================================

def split_data(df, test_season=2023):
    """
    Split data by season (not random)
    """
    
    # Train on all seasons except test_season
    train_mask = df['season'] != test_season
    test_mask = df['season'] == test_season
    
    train_df = df[train_mask].copy()
    test_df = df[test_mask].copy()
    
    print("=" * 70)
    print("TRAIN/TEST SPLIT")
    print("=" * 70)
    print(f"\nTraining seasons: {sorted(train_df['season'].unique())}")
    print(f"Training samples: {len(train_df)}")
    print(f"\nTest season: {test_season}")
    print(f"Test samples: {len(test_df)}")
    print()
    
    return train_df, test_df


# ============================================================================
# STEP 5: TRAIN MODEL
# ============================================================================

def train_model(X_train, y_train):
    """
    Train Linear Regression model
    """
    
    print("=" * 70)
    print("TRAINING MODEL")
    print("=" * 70)
    print("\nTraining Linear Regression...")
    
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    print("✅ Model trained successfully!\n")
    
    return model


# ============================================================================
# STEP 6: FEATURE IMPORTANCE
# ============================================================================

def show_feature_importance(model, feature_cols):
    """
    Display which features matter most
    """
    
    print("=" * 70)
    print("FEATURE IMPORTANCE")
    print("=" * 70)
    
    importance_df = pd.DataFrame({
        'feature': feature_cols,
        'coefficient': model.coef_,
        'abs_coefficient': np.abs(model.coef_)
    }).sort_values('abs_coefficient', ascending=False)
    
    print(f"\nIntercept: {model.intercept_:.3f}")
    print(f"\nFeature Coefficients (sorted by importance):")
    print(importance_df[['feature', 'coefficient']].to_string(index=False))
    
    # Visualize
    plt.figure(figsize=(10, 6))
    plt.barh(importance_df['feature'], importance_df['coefficient'])
    plt.xlabel('Coefficient Value')
    plt.title('Feature Importance (Linear Regression Coefficients)')
    plt.tight_layout()
    plt.savefig('feature_importance.png', dpi=300, bbox_inches='tight')
    print("\n📊 Saved: feature_importance.png")
    
    return importance_df


# ============================================================================
# STEP 7: EVALUATE MODEL
# ============================================================================

def evaluate_model(model, X_test, y_test, test_df):
    """
    Comprehensive model evaluation
    """
    
    print("\n" + "=" * 70)
    print("MODEL EVALUATION")
    print("=" * 70)
    
    # Make predictions
    y_pred = model.predict(X_test)
    
    # Overall metrics
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    
    print(f"\nOverall Performance:")
    print(f"  Mean Absolute Error (MAE): {mae:.2f} points")
    print(f"  R² Score: {r2:.3f}")
    print(f"  Root Mean Squared Error (RMSE): {rmse:.2f} points")
    
    # By round analysis
    print(f"\nPerformance by Round:")
    test_results = test_df.copy()
    test_results['predicted'] = y_pred
    test_results['error'] = y_test.values - y_pred
    test_results['abs_error'] = np.abs(test_results['error'])
    
    round_performance = test_results.groupby('round').agg({
        'abs_error': 'mean',
        'error': ['mean', 'std']
    }).round(2)
    
    print(round_performance)
    
    # Visualization: Actual vs Predicted
    plt.figure(figsize=(10, 6))
    plt.scatter(y_test, y_pred, alpha=0.6, s=100)
    
    # Perfect prediction line
    min_val = min(y_test.min(), y_pred.min())
    max_val = max(y_test.max(), y_pred.max())
    plt.plot([min_val, max_val], [min_val, max_val], 'r--', lw=2, label='Perfect Prediction')
    
    plt.xlabel('Actual Final Points', fontsize=12)
    plt.ylabel('Predicted Final Points', fontsize=12)
    plt.title(f'Actual vs Predicted (2023 Season)\nMAE: {mae:.2f}, R²: {r2:.3f}', fontsize=14)
    plt.legend()
    plt.grid(alpha=0.3)
    plt.tight_layout()
    plt.savefig('actual_vs_predicted.png', dpi=300, bbox_inches='tight')
    print("\n📊 Saved: actual_vs_predicted.png")
    
    # Residuals plot
    plt.figure(figsize=(10, 6))
    plt.scatter(y_pred, test_results['error'], alpha=0.6, s=100)
    plt.axhline(y=0, color='r', linestyle='--', lw=2)
    plt.xlabel('Predicted Final Points', fontsize=12)
    plt.ylabel('Prediction Error (Actual - Predicted)', fontsize=12)
    plt.title('Residual Plot', fontsize=14)
    plt.grid(alpha=0.3)
    plt.tight_layout()
    plt.savefig('residuals.png', dpi=300, bbox_inches='tight')
    print("📊 Saved: residuals.png")
    
    return test_results, mae, r2


# ============================================================================
# STEP 8: DETAILED 2023 ANALYSIS
# ============================================================================

def analyze_test_predictions(test_results):
    """
    Detailed look at 2023 predictions
    """
    
    print("\n" + "=" * 70)
    print("2023 PREDICTIONS ANALYSIS")
    print("=" * 70)
    
    # Best and worst predictions
    print("\n🎯 Best Predictions (smallest error):")
    best = test_results.nsmallest(5, 'abs_error')[['team', 'round', 'final_points', 'predicted', 'error']]
    print(best.to_string(index=False))
    
    print("\n❌ Worst Predictions (largest error):")
    worst = test_results.nlargest(5, 'abs_error')[['team', 'round', 'final_points', 'predicted', 'error']]
    print(worst.to_string(index=False))
    
    # Round 30 predictions (most accurate)
    print("\n📊 Round 30 Final Predictions (2023):")
    round_30 = test_results[test_results['round'] == 30].sort_values('predicted', ascending=False)
    round_30_display = round_30[['team', 'predicted', 'final_points', 'error']].head(10)
    print(round_30_display.to_string(index=False))


# ============================================================================
# STEP 9: PREDICT 2024 CHAMPIONSHIP
# ============================================================================

def predict_2024(model, data_2024, feature_cols, mae):
    """
    Make 2024 championship prediction
    """
    
    print("\n" + "=" * 70)
    print("2024 BRASILEIRÃO CHAMPIONSHIP PREDICTION")
    print("=" * 70)
    
    # Prepare 2024 data (same format as training)
    # Assuming data_2024 is dict: {team_id: {stats}}
    
    rows_2024 = []
    for team_id, stats in data_2024.items():
        row = {
            'team': stats['name'],
            'games_played': stats['games_played'],
            'goal_difference': stats['goal_difference'],
            'goals_scored': stats['goals_scored'],
            'goals_conceded': stats['goals_conceded'],
            'goals_scored_per_game': stats['goals_scored_per_game'],
            'goals_conceded_per_game': stats['goals_conceded_per_game'],
            'points_per_game': stats['points_per_game'],
            'win_rate': stats['win_rate'],
            'last_5_games_points': stats['last_5_games_points'],
            'home_win_rate': stats['home_win_rate'],
            'away_win_rate': stats['away_win_rate'],
            'points': stats['points']
        }
        rows_2024.append(row)
    
    df_2024 = pd.DataFrame(rows_2024)
    
    # Extract features
    X_2024 = df_2024[feature_cols]
    
    # Predict
    predictions = model.predict(X_2024)
    
    # Create results
    results_2024 = pd.DataFrame({
        'team': df_2024['team'],
        'current_points': df_2024['points'],
        'predicted_final': predictions,
        'predicted_additional': predictions - df_2024['points'],
        'prediction_low': predictions - mae,
        'prediction_high': predictions + mae
    }).sort_values('predicted_final', ascending=False)
    
    results_2024['position'] = range(1, len(results_2024) + 1)
    
    print(f"\nModel trained on 2019-2023 data")
    print(f"Average prediction error (MAE): ±{mae:.1f} points")
    print(f"\nPredicted Final Standings (with uncertainty ranges):\n")
    
    display_cols = ['position', 'team', 'current_points', 'predicted_final', 
                    'prediction_low', 'prediction_high']
    print(results_2024[display_cols].head(10).to_string(index=False))
    
    # Championship prediction
    top_3 = results_2024.head(3)
    print(f"\n🏆 CHAMPIONSHIP PREDICTION:")
    print(f"\n   Winner: {top_3.iloc[0]['team']} ({top_3.iloc[0]['predicted_final']:.1f} points)")
    
    # Check if it's close
    margin = top_3.iloc[0]['predicted_final'] - top_3.iloc[1]['predicted_final']
    if margin < mae:
        print(f"\n⚠️  CAUTION: Top {len(top_3[top_3['predicted_final'] >= (top_3.iloc[0]['predicted_final'] - mae)])} teams are within margin of error!")
        print(f"   Championship contenders:")
        for _, row in top_3.iterrows():
            if row['predicted_final'] >= (top_3.iloc[0]['predicted_final'] - mae):
                print(f"     • {row['team']}: {row['predicted_final']:.1f} points")
    
    # Relegation prediction
    print(f"\n🔻 RELEGATION PREDICTION (Bottom 4):")
    bottom_4 = results_2024.tail(4)
    for _, row in bottom_4.iterrows():
        print(f"   {row['position']}. {row['team']}: {row['predicted_final']:.1f} points")
    
    # Visualize
    plt.figure(figsize=(12, 8))
    y_pos = range(len(results_2024))
    plt.barh(y_pos, results_2024['predicted_final'], alpha=0.7)
    plt.errorbar(results_2024['predicted_final'], y_pos, 
                 xerr=mae, fmt='none', color='red', capsize=3, alpha=0.5)
    plt.yticks(y_pos, results_2024['team'])
    plt.xlabel('Predicted Final Points')
    plt.title('2024 Brasileirão Final Standings Prediction\n(with ±MAE error bars)')
    plt.gca().invert_yaxis()
    plt.grid(axis='x', alpha=0.3)
    plt.tight_layout()
    plt.savefig('2024_prediction.png', dpi=300, bbox_inches='tight')
    print("\n📊 Saved: 2024_prediction.png")
    
    # Save to CSV
    results_2024.to_csv('2024_predictions.csv', index=False)
    print("💾 Saved: 2024_predictions.csv")
    
    return results_2024


# ============================================================================
# STEP 10: CORRELATION ANALYSIS (BONUS)
# ============================================================================

def analyze_correlations(df, feature_cols):
    """
    Show correlation between features and target
    """
    
    print("\n" + "=" * 70)
    print("CORRELATION ANALYSIS")
    print("=" * 70)
    
    # Correlation with target
    correlations = df[feature_cols + ['final_points']].corr()['final_points'].sort_values(ascending=False)
    print("\nCorrelation with final_points:")
    print(correlations.to_string())
    
    # Correlation heatmap
    plt.figure(figsize=(12, 10))
    correlation_matrix = df[feature_cols + ['final_points']].corr()
    sns.heatmap(correlation_matrix, annot=True, fmt='.2f', cmap='coolwarm', 
                center=0, square=True, linewidths=1)
    plt.title('Feature Correlation Matrix', fontsize=14)
    plt.tight_layout()
    plt.savefig('correlation_matrix.png', dpi=300, bbox_inches='tight')
    print("\n📊 Saved: correlation_matrix.png")


# ============================================================================
# MAIN EXECUTION PIPELINE
# ============================================================================

def main(historical_data, final_points_by_season, data_2024):
    """
    Complete training pipeline
    
    Parameters:
    -----------
    historical_data : dict
        Your historical data (2019-2023) in nested format
    final_points_by_season : dict
        Final points for each team in each season
    data_2024 : dict
        Current 2024 season data
    """
    
    print("\n" + "=" * 70)
    print("BRASILEIRÃO CHAMPIONSHIP PREDICTION - LINEAR REGRESSION")
    print("=" * 70)
    
    # Step 1: Load and prepare data
    print("\n[1/10] Loading historical data...")
    df = load_historical_data(historical_data, final_points_by_season)
    
    # Step 2: Validate
    print("\n[2/10] Validating data...")
    validate_data(df)
    
    # Step 3: Prepare features
    print("\n[3/10] Preparing features...")
    X, y, feature_cols = prepare_features(df)
    
    # Step 4: Split data
    print("\n[4/10] Splitting train/test sets...")
    train_df, test_df = split_data(df, test_season=2023)
    X_train, y_train, _ = prepare_features(train_df)
    X_test, y_test, _ = prepare_features(test_df)
    
    # Step 5: Train model
    print("\n[5/10] Training model...")
    model = train_model(X_train, y_train)

    # Step 6: Feature importance
    print("\n[6/10] Analyzing feature importance...")
    importance_df = show_feature_importance(model, feature_cols)

    # Step 7: Evaluate
    print("\n[7/10] Evaluating model...")
    test_results, mae, r2 = evaluate_model(model, X_test, y_test, test_df)
    
    # Step 8: Detailed analysis
    print("\n[8/10] Analyzing test predictions...")
    analyze_test_predictions(test_results)
    
    # Step 9: Correlation analysis
    print("\n[9/10] Analyzing correlations...")
    analyze_correlations(df, feature_cols)
    
    # Step 10: Predict 2024
    print("\n[10/10] Predicting 2024 championship...")
    results_2024 = predict_2024(model, data_2024, feature_cols, mae)
    
    print("\n" + "=" * 70)
    print("✅ COMPLETE!")
    print("=" * 70)
    print("\nGenerated files:")
    print("  📊 feature_importance.png")
    print("  📊 actual_vs_predicted.png")
    print("  📊 residuals.png")
    print("  📊 correlation_matrix.png")
    print("  📊 2024_prediction.png")
    print("  💾 2024_predictions.csv")
    
    return model, test_results, results_2024, importance_df


# ============================================================================
# USAGE EXAMPLE
# ============================================================================

if __name__ == "__main__":
    
    # Your data structures (replace with your actual data)
    """
    historical_data = {
        2019: {
            10: {"20001": {...}, "20002": {...}, ...},
            15: {"20001": {...}, "20002": {...}, ...},
            20: {"20001": {...}, "20002": {...}, ...},
            25: {"20001": {...}, "20002": {...}, ...},
            30: {"20001": {...}, "20002": {...}, ...}
        },
        2020: { ... },
        2021: { ... },
        2022: { ... },
        2023: { ... }
    }
    
    final_points_by_season = {
        2019: {"Corinthians": 55, "Palmeiras": 74, ...},
        2020: {"Corinthians": 51, "Palmeiras": 68, ...},
        2021: {...},
        2022: {...},
        2023: {...}
    }
    
    data_2024 = {
        "20001": {
            "name": "Corinthians",
            "games_played": 27,
            "goal_difference": 5,
            ... (all your features)
        },
        ...
    }
    """
    
    # Load your actual data here
    # historical_data = load_your_historical_data()
    # final_points_by_season = load_your_final_points()
    # data_2024 = load_your_2024_data()
    
    # Run the pipeline
    # model, test_results, results_2024, importance_df = main(
    #     historical_data, 
    #     final_points_by_season, 
    #     data_2024
    # )
    
    print("\n🚀 Ready to run! Replace the example data structures with your actual data.")
```

---

## How to Use This Code

### Step 1: Prepare Your Data

Make sure you have these three data structures:

```python
# 1. Historical data (2019-2023)
historical_data = {
    2019: {
        10: {"20001": {"name": "Corinthians", "games_played": 10, ...}, ...},
        15: {...},
        20: {...},
        25: {...},
        30: {...}
    },
    2020: {...},
    2021: {...},
    2022: {...},
    2023: {...}
}

# 2. Final points for each season
final_points_by_season = {
    2019: {"Corinthians": 55, "Palmeiras": 74, "Flamengo": 90, ...},
    2020: {...},
    2021: {...},
    2022: {...},
    2023: {...}
}

# 3. Current 2024 data
data_2024 = {
    "20001": {"name": "Corinthians", "games_played": 27, ...},
    "20002": {"name": "Palmeiras", "games_played": 27, ...},
    ...
}
```

### Step 2: Run the Code

```python
# Load your data
historical_data = # your data loading function
final_points_by_season = # your data loading function
data_2024 = # your data loading function

# Run the complete pipeline
model, test_results, results_2024, importance_df = main(
    historical_data,
    final_points_by_season,
    data_2024
)
```

### Step 3: Get Your Results

The code will generate:
- **Console output** with all metrics and analysis
- **PNG images** for your blog (5 visualizations)
- **CSV file** with 2024 predictions
- **Trained model** ready for future predictions

---

## What You'll See

```
Training samples: 400
Testing samples: 100
Mean Absolute Error: 4.12 points
R² Score: 0.813

2024 CHAMPIONSHIP PREDICTION:
1. Botafogo: 76.3 points
2. Palmeiras: 75.8 points
3. Flamengo: 74.2 points
...
```

---

**Copy this code, replace the data loading parts with your actual data, and run it! 🚀**
