using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FloatingBehaviour : MonoBehaviour {

	public bool shouldHover = true;
	public Vector2 effect;
	public float speed;

	private Transform myTransform;
	private Vector2 startPos;
	private float curX;

	// Use this for initialization
	void Start () {
		myTransform = GetComponent<Transform> ();
		startPos = myTransform.position;
	}

	// Update is called once per frame
	void Update () {
		if (shouldHover == true) {
			hover();
		}
	}

	void hover() {
		curX += speed;

		myTransform.position = new Vector2(startPos.x + Mathf.Cos(curX) * effect.x, startPos.y + Mathf.Cos(curX) * effect.y);
	}

	public void StartHover()
	{
		shouldHover = true;
	}

	public void StopHover()
	{
		shouldHover = false;
	}
}