using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SelfDestruct : MonoBehaviour {

	public float timeBeforeDestruction;

	// Use this for initialization
	void Start () {
		StartCoroutine(killAfterSecond());
	}
	
	// Update is called once per frame
	void Update () {
		
	}

	IEnumerator killAfterSecond()
	{
		yield return new WaitForSeconds(timeBeforeDestruction);
		Destroy(gameObject);
	}
}
