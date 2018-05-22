using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InputHandler : MonoBehaviour {

	public GameObject SpriteFolder;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {

		if(Input.GetKeyDown(KeyCode.Space))
		{
			ShowHideMenu();
		}
	}

	void ShowHideMenu()
	{
		SpriteFolder.SetActive(!SpriteFolder.activeSelf);
	}
}
