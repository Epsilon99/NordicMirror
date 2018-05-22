using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InstantiateCoin : MonoBehaviour {

	public GameObject CoinPrefab;
	public Transform SpawnPoint;
	public float MaxSpawnSpeed, MinSpawnSpeed;
	public float MinSpawnSize, MaxSpawnSize;
	public int SpawnAmount;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyDown (KeyCode.G))
			SpawnCoins ();
	}

	public void SpawnCoins()
	{
		for (int i = 0; i < SpawnAmount; i++) 
		{
			Vector2 dir = new Vector2 (Random.Range (-1f, 1f),Random.Range(0f, 1f));
			float spawnSize = Random.Range (MinSpawnSize, MaxSpawnSize);
			float spawnSpeed = Random.Range (MinSpawnSpeed, MaxSpawnSpeed);
			dir = dir.normalized;

			GameObject tCoin = Instantiate (CoinPrefab, SpawnPoint) as GameObject;
			tCoin.GetComponent<Transform> ().localScale = new Vector3 (spawnSize, spawnSize, 1);
			tCoin.GetComponent<Rigidbody2D> ().AddForce(dir * spawnSpeed);
		}
	}
}
